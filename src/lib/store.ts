import { Property, Booking, User, CorporateAccount, Review, VehicleType } from '@/types';
import { DEMO_PROPERTIES, DEMO_BOOKINGS, DEMO_USERS, DEMO_CORPORATE_ACCOUNTS, DEMO_REVIEWS } from '@/data/seedData';

// Global in-memory singleton to persist state during Next.js server runtime
declare global {
  // eslint-disable-next-line no-var
  var __chaloStore: {
    properties: Property[];
    bookings: Booking[];
    users: User[];
    corporateAccounts: CorporateAccount[];
    reviews: Review[];
    currentUser: User;
    platformCommissionPercent: number;
  } | undefined;
}

if (!global.__chaloStore) {
  global.__chaloStore = {
    properties: JSON.parse(JSON.stringify(DEMO_PROPERTIES)),
    bookings: JSON.parse(JSON.stringify(DEMO_BOOKINGS)),
    users: JSON.parse(JSON.stringify(DEMO_USERS)),
    corporateAccounts: JSON.parse(JSON.stringify(DEMO_CORPORATE_ACCOUNTS)),
    reviews: JSON.parse(JSON.stringify(DEMO_REVIEWS)),
    currentUser: DEMO_USERS[0],
    platformCommissionPercent: 12,
  };
}

export const store = global.__chaloStore!;

export interface BookingInput {
  propertyId: string;
  roomId: string;
  bedId: string;
  checkInTime: string;
  durationHours: number;
  vehicleType: VehicleType;
  specialRequests?: string;
  userId?: string;
  userName?: string;
  userPhone?: string;
}

// Generate unique booking code
export function generateBookingCode(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CR-${new Date().getFullYear()}-${rand}`;
}

// Generate secure QR token
export function generateSecureQRToken(bookingCode: string, bedId: string): string {
  const secretPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `CR-SECURE-${bookingCode}-${bedId}-${secretPart}`;
}

// Transactional Overlap check: ensure no two bookings conflict on the exact same bed
export function isBedAvailableForPeriod(
  bedId: string,
  requestedStart: Date,
  requestedEnd: Date,
  excludeBookingId?: string
): boolean {
  const property = store.properties.find(p =>
    p.rooms.some(r => r.beds.some(b => b.id === bedId))
  );
  if (!property) return false;

  const room = property.rooms.find(r => r.beds.some(b => b.id === bedId));
  const bed = room?.beds.find(b => b.id === bedId);
  if (!bed || bed.isBlocked) return false;

  // Check all existing confirmed, checked-in, or pending bookings for this bed
  const conflicts = store.bookings.filter(b => {
    if (b.bedId !== bedId) return false;
    if (excludeBookingId && b.id === excludeBookingId) return false;
    if (b.status === 'CANCELLED' || b.status === 'COMPLETED') return false;

    const bStart = new Date(b.checkInTime).getTime();
    const bEnd = new Date(b.scheduledCheckOut).getTime();
    const reqStart = requestedStart.getTime();
    const reqEnd = requestedEnd.getTime();

    // Overlap condition: start < otherEnd && end > otherStart
    return reqStart < bEnd && reqEnd > bStart;
  });

  return conflicts.length === 0;
}

// Create new hourly booking
export function createBooking(input: BookingInput): { success: boolean; booking?: Booking; error?: string } {
  const property = store.properties.find(p => p.id === input.propertyId);
  if (!property) return { success: false, error: 'Property not found' };

  const room = property.rooms.find(r => r.id === input.roomId);
  if (!room) return { success: false, error: 'Room not found' };

  const bed = room.beds.find(b => b.id === input.bedId);
  if (!bed) return { success: false, error: 'Bed not found' };

  const checkInDate = new Date(input.checkInTime);
  const checkOutDate = new Date(checkInDate.getTime() + input.durationHours * 60 * 60 * 1000);

  // Validate bed availability
  if (!isBedAvailableForPeriod(input.bedId, checkInDate, checkOutDate)) {
    return {
      success: false,
      error: `Bed ${bed.bedNumber} is already booked or reserved for the selected time window. Please select another bed or adjust your time.`
    };
  }

  const hourlyRate = bed.hourlyRate || room.hourlyRate || property.baseHourlyRate;
  const baseAmount = hourlyRate * input.durationHours;
  const taxAmount = Math.round(baseAmount * 0.12 * 100) / 100; // 12% GST
  const platformFee = 10;
  const totalAmount = baseAmount + taxAmount + platformFee;

  const bookingCode = generateBookingCode();
  const qrToken = generateSecureQRToken(bookingCode, bed.id);

  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    bookingCode,
    userId: input.userId || store.currentUser.id,
    userName: input.userName || store.currentUser.name,
    userPhone: input.userPhone || store.currentUser.phone,
    propertyId: property.id,
    propertyName: property.name,
    propertyAddress: property.address,
    propertyCity: property.city,
    roomId: room.id,
    roomName: room.name,
    bedId: bed.id,
    bedNumber: bed.bedNumber,
    checkInTime: checkInDate.toISOString(),
    durationHours: input.durationHours,
    scheduledCheckOut: checkOutDate.toISOString(),
    hourlyRate,
    baseAmount,
    taxAmount,
    platformFee,
    discountAmount: 0,
    totalAmount,
    status: 'CONFIRMED',
    paymentStatus: 'PAID', // Demo instant confirmation
    paymentMethod: 'UPI / Demo Gateway',
    qrToken,
    vehicleType: input.vehicleType,
    specialRequests: input.specialRequests,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Update bed in-memory availability
  bed.isAvailable = false;
  bed.currentBookingId = newBooking.id;

  store.bookings.unshift(newBooking);
  return { success: true, booking: newBooking };
}

// Extend Stay
export function extendBooking(bookingId: string, additionalHours: number): { success: boolean; error?: string; booking?: Booking } {
  const booking = store.bookings.find(b => b.id === bookingId);
  if (!booking) return { success: false, error: 'Booking not found' };

  if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
    return { success: false, error: 'Cannot extend completed or cancelled stay' };
  }

  const currentCheckOut = new Date(booking.scheduledCheckOut);
  const newCheckOut = new Date(currentCheckOut.getTime() + additionalHours * 60 * 60 * 1000);

  // Overlap verification for extension period
  if (!isBedAvailableForPeriod(booking.bedId, currentCheckOut, newCheckOut, booking.id)) {
    return {
      success: false,
      error: `Bed ${booking.bedNumber} has an upcoming reservation during the requested extension time. Extension cannot be granted.`
    };
  }

  const additionalBase = booking.hourlyRate * additionalHours;
  const additionalTax = Math.round(additionalBase * 0.12 * 100) / 100;
  const additionalTotal = additionalBase + additionalTax;

  booking.scheduledCheckOut = newCheckOut.toISOString();
  booking.durationHours += additionalHours;
  booking.baseAmount += additionalBase;
  booking.taxAmount += additionalTax;
  booking.totalAmount += additionalTotal;
  booking.status = 'EXTENDED';
  booking.updatedAt = new Date().toISOString();

  if (!booking.extensions) booking.extensions = [];
  booking.extensions.push({
    id: `ext-${Date.now()}`,
    additionalHours,
    additionalAmount: additionalTotal,
    extendedAt: new Date().toISOString(),
  });

  return { success: true, booking };
}

// Check-in via QR Scanner
export function checkInByQR(qrToken: string): { success: boolean; error?: string; booking?: Booking } {
  const booking = store.bookings.find(b => b.qrToken === qrToken || b.bookingCode === qrToken);
  if (!booking) return { success: false, error: 'Invalid or expired QR token' };

  if (booking.status === 'CHECKED_IN') {
    return { success: false, error: 'Guest is already checked in to ' + booking.bedNumber };
  }
  if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
    return { success: false, error: 'This booking is ' + booking.status.toLowerCase() };
  }

  booking.status = 'CHECKED_IN';
  booking.actualCheckIn = new Date().toISOString();
  booking.updatedAt = new Date().toISOString();

  return { success: true, booking };
}

// Check-out via QR Scanner
export function checkOutByQR(qrToken: string): { success: boolean; error?: string; booking?: Booking; lateFee?: number } {
  const booking = store.bookings.find(b => b.qrToken === qrToken || b.bookingCode === qrToken);
  if (!booking) return { success: false, error: 'Invalid or expired QR token' };

  if (booking.status === 'COMPLETED') {
    return { success: false, error: 'Booking already checked out' };
  }

  const now = new Date();
  booking.actualCheckOut = now.toISOString();
  booking.status = 'COMPLETED';
  booking.updatedAt = now.toISOString();

  // Free bed
  const property = store.properties.find(p => p.id === booking.propertyId);
  const room = property?.rooms.find(r => r.id === booking.roomId);
  const bed = room?.beds.find(b => b.id === booking.bedId);
  if (bed) {
    bed.isAvailable = true;
    bed.currentBookingId = undefined;
  }

  return { success: true, booking };
}

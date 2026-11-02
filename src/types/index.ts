export type UserRole = 'CUSTOMER' | 'HOTEL_OWNER' | 'HOTEL_STAFF' | 'ADMIN' | 'CORPORATE_ADMIN';

export type VehicleType = 'CAB_TAXI' | 'TRUCK' | 'MOTORCYCLE' | 'PRIVATE_CAR' | 'BUS' | 'OTHER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  preferredVehicle?: VehicleType;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  savedLocations?: string[];
  loyaltyPoints: number;
  corporateId?: string;
  createdAt: string;
}

export type GenderCategory = 'ALL' | 'MALE_ONLY' | 'FEMALE_ONLY' | 'FAMILY';

export type RoomCategory = 'SHARED_4_BED' | 'SHARED_8_BED' | 'PRIVATE_ROOM';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'SAFETY' | 'COMFORT' | 'VEHICLE' | 'HYGIENE';
}

export interface Bed {
  id: string;
  roomId: string;
  propertyId: string;
  bedNumber: string; // e.g. "Bed A1", "Bed A2"
  label: string; // "Lower bunk window side"
  hourlyRate: number; // e.g. 40
  isAvailable: boolean;
  isBlocked: boolean;
  maintenanceReason?: string;
  currentBookingId?: string;
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string; // e.g. "101-C"
  name: string; // "Express Rest Dorm A"
  category: RoomCategory;
  capacity: number; // 4 or 8
  hourlyRate: number; // Base rate per bed
  acType: 'AC' | 'NON_AC';
  bathroomType: 'ATTACHED' | 'DEDICATED_COMMON';
  genderCategory: GenderCategory;
  beds: Bed[];
  isAvailable: boolean;
  dimensionsFeet?: string; // "20 x 14 ft - Fire code compliant"
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  ownerId: string;
  ownerName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  city: string;
  state: string;
  highway: string; // e.g. "NH 48 (Ahmedabad-Mumbai)"
  highwayMarkerKm?: number;
  detourDistanceKm: number; // e.g. 0.2
  gpsLat: number;
  gpsLng: number;
  images: string[];
  rating: number;
  reviewCount: number;
  baseHourlyRate: number; // e.g. 35
  minDurationHours: number; // e.g. 1
  maxDurationHours: number; // e.g. 12
  gracePeriodMins: number; // e.g. 15
  isVerified: boolean;
  isPublished: boolean;
  isDemoListing?: boolean;
  
  // Facilities
  truckParking: boolean;
  truckParkingCapacity?: number;
  generalParking: boolean;
  cctvSecured: boolean;
  cleanWashrooms: boolean;
  attachedBathrooms: boolean;
  hotWater24x7: boolean;
  acRoomsAvailable: boolean;
  foodAvailable: boolean;
  driverLounge: boolean;
  drinkingWaterRO: boolean;
  genderCategory: GenderCategory;
  
  rooms: Room[];
  createdAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'EXTENDED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';

export interface Booking {
  id: string;
  bookingCode: string; // e.g. "CR-2026-8849"
  userId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  propertyCity: string;
  roomId: string;
  roomName: string;
  bedId: string;
  bedNumber: string;
  
  checkInTime: string; // ISO string
  durationHours: number; // 1 to 12
  scheduledCheckOut: string; // ISO string
  actualCheckIn?: string;
  actualCheckOut?: string;
  
  hourlyRate: number;
  baseAmount: number; // hourlyRate * duration
  taxAmount: number; // 12% GST
  platformFee: number; // ₹10 convenience fee
  discountAmount: number;
  totalAmount: number;
  
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  qrToken: string;
  vehicleType: VehicleType;
  specialRequests?: string;
  
  extensions?: {
    id: string;
    additionalHours: number;
    additionalAmount: number;
    extendedAt: string;
  }[];
  
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  vehicleType: VehicleType;
  rating: number; // 1-5
  cleanlinessRating: number;
  safetyRating: number;
  comment: string;
  createdAt: string;
}

export interface RouteSearchFilter {
  origin: string;
  destination: string;
  travelDate: string;
  checkInTime: string;
  duration: number;
  travellers: number;
  vehicleType: VehicleType;
  maxDetourKm?: number;
  minRating?: number;
  maxHourlyPrice?: number;
  acOnly?: boolean;
  attachedBathOnly?: boolean;
  truckParkingOnly?: boolean;
  genderPreference?: GenderCategory;
}

export interface CorporateAccount {
  id: string;
  companyName: string;
  gstNumber: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  creditLimit: number;
  currentBalance: number;
  activeDriversCount: number;
  billingCycle: 'WEEKLY' | 'MONTHLY';
  drivers: {
    id: string;
    name: string;
    phone: string;
    vehicleNumber: string;
    vehicleType: VehicleType;
    isActive: boolean;
  }[];
}

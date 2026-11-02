import { NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { Property } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location')?.toLowerCase() || '';
  const highway = searchParams.get('highway')?.toLowerCase() || '';
  const vehicle = searchParams.get('vehicle');
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
  const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null;
  const truckParkingOnly = searchParams.get('truckParking') === 'true';
  const acOnly = searchParams.get('ac') === 'true';
  const attachedBathOnly = searchParams.get('attachedBath') === 'true';

  let results = [...store.properties];

  if (location) {
    results = results.filter(
      p =>
        p.name.toLowerCase().includes(location) ||
        p.city.toLowerCase().includes(location) ||
        p.highway.toLowerCase().includes(location) ||
        p.address.toLowerCase().includes(location)
    );
  }

  if (highway) {
    results = results.filter(p => p.highway.toLowerCase().includes(highway));
  }

  if (truckParkingOnly || vehicle === 'TRUCK') {
    results = results.filter(p => p.truckParking);
  }

  if (acOnly) {
    results = results.filter(p => p.acRoomsAvailable);
  }

  if (attachedBathOnly) {
    results = results.filter(p => p.attachedBathrooms);
  }

  if (maxPrice !== null) {
    results = results.filter(p => p.baseHourlyRate <= maxPrice);
  }

  if (minRating !== null) {
    results = results.filter(p => p.rating >= minRating);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    properties: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      slug: (body.name || 'highway-rest-hub')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + `-${Math.floor(Math.random() * 900 + 100)}`,
      name: body.name || 'ChaloRest Partner Hub',
      tagline: body.tagline || 'Clean Highway Hourly Rest',
      description: body.description || 'Verified ChaloRest hourly accommodation.',
      ownerId: body.ownerId || store.currentUser.id,
      ownerName: body.ownerName || store.currentUser.name,
      contactPhone: body.contactPhone || '+91 98000 00000',
      contactEmail: body.contactEmail || 'partner@chalorest.in',
      address: body.address || 'Highway Road',
      city: body.city || 'Highway Junction',
      state: body.state || 'India',
      highway: body.highway || 'National Highway',
      detourDistanceKm: body.detourDistanceKm ? Number(body.detourDistanceKm) : 0.1,
      gpsLat: body.gpsLat ? Number(body.gpsLat) : 21.0,
      gpsLng: body.gpsLng ? Number(body.gpsLng) : 73.0,
      images: body.images && body.images.length > 0 ? body.images : ['/images/partner-hotel.jpg', '/images/shared-accommodation.jpg'],
      rating: 5.0,
      reviewCount: 1,
      baseHourlyRate: body.baseHourlyRate ? Number(body.baseHourlyRate) : 35,
      minDurationHours: 1,
      maxDurationHours: 12,
      gracePeriodMins: 15,
      isVerified: false, // Needs admin approval
      isPublished: true,
      isDemoListing: false,
      truckParking: Boolean(body.truckParking),
      truckParkingCapacity: body.truckParkingCapacity ? Number(body.truckParkingCapacity) : 20,
      generalParking: true,
      cctvSecured: true,
      cleanWashrooms: true,
      attachedBathrooms: true,
      hotWater24x7: true,
      acRoomsAvailable: true,
      foodAvailable: true,
      driverLounge: true,
      drinkingWaterRO: true,
      genderCategory: body.genderCategory || 'ALL',
      createdAt: new Date().toISOString(),
      rooms: [
        {
          id: `room-${Date.now()}-1`,
          propertyId: `prop-${Date.now()}`,
          roomNumber: 'Dorm A (4 Beds)',
          name: '4-Bed Shared Rest Room',
          category: 'SHARED_4_BED',
          capacity: 4,
          hourlyRate: body.baseHourlyRate ? Number(body.baseHourlyRate) : 35,
          acType: 'AC',
          bathroomType: 'ATTACHED',
          genderCategory: 'ALL',
          isAvailable: true,
          beds: [
            { id: `bed-${Date.now()}-1`, roomId: `room-${Date.now()}-1`, propertyId: `prop-${Date.now()}`, bedNumber: 'Bed A1', label: 'Lower Berth', hourlyRate: 35, isAvailable: true, isBlocked: false },
            { id: `bed-${Date.now()}-2`, roomId: `room-${Date.now()}-1`, propertyId: `prop-${Date.now()}`, bedNumber: 'Bed A2', label: 'Upper Berth', hourlyRate: 35, isAvailable: true, isBlocked: false },
            { id: `bed-${Date.now()}-3`, roomId: `room-${Date.now()}-1`, propertyId: `prop-${Date.now()}`, bedNumber: 'Bed A3', label: 'Lower Berth', hourlyRate: 35, isAvailable: true, isBlocked: false },
            { id: `bed-${Date.now()}-4`, roomId: `room-${Date.now()}-1`, propertyId: `prop-${Date.now()}`, bedNumber: 'Bed A4', label: 'Upper Berth', hourlyRate: 35, isAvailable: true, isBlocked: false },
          ]
        }
      ]
    };

    store.properties.unshift(newProperty);
    return NextResponse.json({ success: true, property: newProperty }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

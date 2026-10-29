import crypto from 'crypto';
import { prisma } from './db';
import { vehicles } from './vehicles';

import { popularRoutes as popularRoutesSeed, popularReviews as popularReviewsSeed } from './homeContent';

export async function seedDatabase() {
  if ((global as any).dbSeeded || (global as any).dbSeedingInProgress) {
    return;
  }
  (global as any).dbSeedingInProgress = true;
  console.log('Sushi Travels - Checking database seeding status...');

  try {
    // 1. Seed Admin User
    const defaultEmail = process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET_KEY;
    if (!defaultEmail || !defaultPassword || !secret) {
      throw new Error('[Seed] Missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_SECRET_KEY in environment variables');
    }
    const passwordHash = crypto.createHmac('sha256', secret).update(defaultPassword).digest('hex');
    // The old Mongoose schema had `lowercase: true` on Admin.email, applied
    // automatically on save; replicate that normalization explicitly here.
    const normalizedEmail = defaultEmail.toLowerCase().trim();

    const existingAdmin = await prisma.admin.findFirst();
    if (!existingAdmin) {
      await prisma.admin.create({
        data: { email: normalizedEmail, passwordHash },
      });
      console.log('[Seed] Seeded default Admin user.');
    } else if (existingAdmin.email !== normalizedEmail || existingAdmin.passwordHash !== passwordHash) {
      // If the admin credentials in the DB differ from current env values, update them automatically
      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { email: normalizedEmail, passwordHash },
      });
      console.log('[Seed] Updated Admin credentials from environment variables.');
    }

    // 2. Seed Vehicles
    const vehicleCount = await prisma.vehicle.count();
    if (vehicleCount === 0 && vehicles.length > 0) {
      await prisma.vehicle.createMany({
        data: vehicles.map((v) => ({
          vehicleId: v.id,
          name: v.name,
          type: v.type,
          seats: v.seats,
          ac: v.ac,
          luggage: v.luggage,
          ratePerKm: v.ratePerKm,
          features: v.features,
          image: v.image,
          images: v.images ?? (v.image ? [v.image] : []),
          imageFit: v.imageFit ?? 'cover',
          imageFits: v.imageFits ?? [],
          imagePositions: v.imagePositions ?? [],
          imageScales: v.imageScales ?? [],
          description: v.description,
          driverBata: v.driverBata,
          minKmPerDay: v.minKmPerDay,
          ratePerKmAc: v.ratePerKmAc,
          ratePerKmNonAc: v.ratePerKmNonAc,
          acOnly: v.acOnly,
          hasNonAcOption: v.hasNonAcOption,
          drivingHours: v.drivingHours,
          priceDisplay: v.priceDisplay,
          seatsDisplay: v.seatsDisplay,
          sortOrder: v.sortOrder ?? 0,
        })),
      });
      console.log(`[Seed] Seeded ${vehicles.length} vehicles.`);
    }

    // 3. Seed Popular Routes
    const routeCount = await prisma.popularRoute.count();
    if (routeCount === 0) {
      await prisma.popularRoute.createMany({ data: popularRoutesSeed });
      console.log(`[Seed] Seeded ${popularRoutesSeed.length} holiday routes.`);
    } else {
      // Migrate/Fix the broken Tirupati route image url (Postgres equivalent of the
      // old Mongo updateMany migration step; tripType always has a DB default now
      // so no separate "missing tripType" backfill is needed).
      const tirupatiResult = await prisma.popularRoute.updateMany({
        where: {
          to: 'Tirupati',
          imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010e4056a2f?auto=format&fit=crop&q=80&w=600',
        },
        data: {
          imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        },
      });
      if (tirupatiResult.count > 0) {
        console.log(`[Seed] Updated ${tirupatiResult.count} existing Tirupati routes with working image URL.`);
      }
    }

    // 4. Seed Testimonials/Reviews
    const reviewCount = await prisma.review.count();
    if (reviewCount === 0) {
      await prisma.review.createMany({ data: popularReviewsSeed });
      console.log(`[Seed] Seeded ${popularReviewsSeed.length} testimonials.`);
    }

    (global as any).dbSeeded = true;
  } finally {
    (global as any).dbSeedingInProgress = false;
  }
}

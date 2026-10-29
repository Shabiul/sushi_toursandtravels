/**
 * One-off: brings the three Force Urbania rows in the LIVE database in line
 * with src/lib/vehicles.ts (new rates + new photos), and inserts the 9-seater.
 *
 * /fleet and the homepage read vehicles from Postgres, and seed.ts only seeds
 * an EMPTY table, so editing vehicles.ts alone does not change them. Without
 * this, the deleted old Urbania photos would 404 on those two pages.
 *
 * Usage (needs DATABASE_URL for the target DB):
 *   npx tsx scripts/sync-urbania-db.ts            # dry run: prints what would change
 *   npx tsx scripts/sync-urbania-db.ts --apply    # writes
 * Admin-edited fields not listed below (e.g. sortOrder, showOnHome) are left alone.
 */
import { prisma } from '../src/lib/db';
import { vehicles } from '../src/lib/vehicles';

const IDS = ['force-urbania-9-seater', 'force-urbania-maharaja-12-seater', 'force-urbania-luxury-16-seater'];
const apply = process.argv.includes('--apply');

async function main() {
  for (const id of IDS) {
    const v = vehicles.find((x) => x.id === id);
    if (!v) throw new Error(`vehicles.ts has no ${id}`);
    const data = {
      name: v.name,
      type: v.type,
      seats: v.seats,
      ac: v.ac,
      luggage: v.luggage,
      ratePerKm: v.ratePerKm,
      features: v.features,
      image: v.image,
      images: v.images ?? [v.image],
      imageFit: v.imageFit ?? 'cover',
      imageFits: v.imageFits ?? [],
      imagePositions: v.imagePositions ?? [],
      imageScales: v.imageScales ?? [],
      description: v.description,
      driverBata: v.driverBata ?? null,
      minKmPerDay: v.minKmPerDay ?? null,
      acOnly: v.acOnly ?? null,
      drivingHours: v.drivingHours ?? null,
      priceDisplay: v.priceDisplay ?? null,
      seatsDisplay: v.seatsDisplay ?? null,
    };
    const existing = await prisma.vehicle.findUnique({ where: { vehicleId: id } });
    console.log(
      `${existing ? 'UPDATE' : 'INSERT'} ${id}: ₹${data.ratePerKm}/km, ${data.images.length} photos` +
        (existing ? ` (was ₹${existing.ratePerKm}/km, ${existing.images.length} photos, priceDisplay=${existing.priceDisplay})` : ''),
    );
    if (!apply) continue;
    if (existing) await prisma.vehicle.update({ where: { vehicleId: id }, data });
    else await prisma.vehicle.create({ data: { vehicleId: id, sortOrder: v.sortOrder ?? 0, ...data } });
  }
  console.log(apply ? 'Applied.' : 'Dry run only — re-run with --apply to write.');
}

main().finally(() => prisma.$disconnect());

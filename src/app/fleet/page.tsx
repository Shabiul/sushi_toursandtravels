import { sortVehiclesForDisplay, vehicles } from '@/lib/vehicles';
import FleetClient from './FleetClient';

// Server Component. The fleet comes straight from src/lib/vehicles.ts — no
// database read — so the page is statically generated, always lists every
// vehicle for crawlers, and cannot go blank if a database is down. Edit that
// file (then redeploy) to change what shows here. All interactivity (filter
// chips, "You May Also Like") lives in the client child.
export default function FleetPage() {
  return <FleetClient initialVehicles={sortVehiclesForDisplay([...vehicles])} hasDataError={false} />;
}

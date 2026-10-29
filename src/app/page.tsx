import HomeClient, { HomeVehicle } from './HomeClient';
import { vehicles } from '@/lib/vehicles';
import { popularRoutes, popularReviews } from '@/lib/homeContent';
import type { RouteInfo } from '@/components/RouteCard';
import type { Testimonial } from '@/components/TestimonialCard';

// Server Component. Fleet, routes and testimonials come straight from the code
// files (src/lib/vehicles.ts, src/lib/homeContent.ts) — no database read — so
// the page is statically generated, always renders in full for crawlers, and
// cannot go blank if a database is down. Edit those files (then redeploy) to
// change what shows here.
const initialVehicles = [...vehicles].sort(
  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
) as HomeVehicle[];

export default function Home() {
  return (
    <HomeClient
      initialVehicles={initialVehicles}
      initialRoutes={popularRoutes as RouteInfo[]}
      initialReviews={popularReviews as Testimonial[]}
      hasDataError={false}
    />
  );
}

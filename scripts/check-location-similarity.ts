// Audit: how distinct are the programmatic landing pages from each other?
// Google's AI guide warns against separate pages per query variation (scaled
// content abuse). For each family, strip the place name and measure how much
// of each page's body text is shared with other pages in the same family.
import { locationPages } from '../src/lib/locations';
import { routePages } from '../src/lib/routes';
import { servicePages } from '../src/lib/services';

type P = { slug: string; bodyParagraphs: string[]; geoSummary?: string; faqs?: { question: string; answer: string }[] };

const words = (t: string) => t.toLowerCase().replace(/[^a-z0-9₹ ]+/g, ' ').split(/\s+/).filter(Boolean);
const shingles = (t: string, n = 5) => {
  const w = words(t);
  const out = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(' '));
  return out;
};
const textOf = (p: P) => [p.geoSummary ?? '', ...p.bodyParagraphs, ...(p.faqs ?? []).map((f) => f.question + ' ' + f.answer)].join(' ');

function family(name: string, pages: P[], strip: (p: P) => string[]) {
  const sets = pages.map((p) => {
    let t = textOf(p);
    for (const s of strip(p)) t = t.replace(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 'PLACE');
    return shingles(t);
  });
  const rows = sets.map((a, i) => {
    let shared = 0;
    a.forEach((sh) => {
      if (sets.some((b, j) => j !== i && b.has(sh))) shared++;
    });
    return { slug: pages[i].slug, words: words(textOf(pages[i])).length, sharedPct: Math.round((shared / Math.max(a.size, 1)) * 100) };
  });
  const avg = Math.round(rows.reduce((s, r) => s + r.sharedPct, 0) / rows.length);
  console.log(`\n${name}: ${pages.length} pages, avg words ${Math.round(rows.reduce((s, r) => s + r.words, 0) / rows.length)}, avg text shared with a sibling page: ${avg}%`);
  rows.sort((a, b) => b.sharedPct - a.sharedPct).slice(0, 4).forEach((r) => console.log(`  ${r.slug}: ${r.sharedPct}% shared, ${r.words} words`));
}

family('locations', locationPages as unknown as P[], (p) => {
  const lp = p as unknown as { slug: string; area?: string; h1?: string };
  return [lp.area ?? '', (lp.slug ?? '').replace('car-rental-', '').replace(/-/g, ' ')].filter(Boolean);
});
family('routes', routePages as unknown as P[], (p) => [(p as unknown as { destination: string }).destination]);
family('services', servicePages as unknown as P[], () => []);

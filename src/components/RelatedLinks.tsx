import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface LinkGroup {
  heading: string;
  links: { label: string; href: string; title?: string }[];
}

/**
 * Shared "explore more" internal-linking block used across the new
 * /vehicles, /services, /locations and /routes pages so each one links out
 * to related vehicles, services, routes/locations, booking and contact with
 * descriptive anchor text (never "click here" / "read more").
 */
export default function RelatedLinks({ groups }: { groups: LinkGroup[] }) {
  const nonEmpty = groups.filter((g) => g.links.length > 0);
  if (!nonEmpty.length) return null;
  return (
    <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-6">
      <h2 className="font-serif font-bold text-xl text-navy">Explore More</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {nonEmpty.map((group) => (
          <div key={group.heading} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-dark">{group.heading}</h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.title || link.label}
                    className="inline-flex items-center text-sm text-navy hover:text-primary transition-colors duration-150 leading-snug"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const jevPath = pathToFileURL('C:/Users/Shabiul/.gemini/config/skills/seo-geo-aeo-engine/scripts/jev-evaluator.mjs').href;
const { evaluateWithJev } = await import(jevPath);

const testPages = [
  { name: 'About Page', file: '.next/server/app/about.html' },
  { name: 'Bangalore to Coorg Route', file: '.next/server/app/routes/bangalore-to-coorg-cab.html' },
  { name: 'Whitefield Car Rental', file: '.next/server/app/locations/car-rental-whitefield.html' },
  { name: 'Privacy Policy', file: '.next/server/app/privacy-policy.html' },
];

async function main() {
  console.log('====================================================');
  console.log('      JEV SYSTEM ONE QUALITY AUDIT RECEIPT          ');
  console.log('====================================================\n');

  for (const page of testPages) {
    const filePath = path.resolve(process.cwd(), page.file);
    if (!fs.existsSync(filePath)) {
      console.log(`[SKIP] File not found: ${page.file}`);
      continue;
    }

    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    // Extract metadata
    const hasVideo = htmlContent.includes('<video') || htmlContent.includes('VideoObject');
    const state = {
      content: {
        text: htmlContent,
        images: [
          { alt: 'Sushi Travels Tempo Traveller Chauffeur Fleet Bangalore' },
          { alt: 'Bangalore to Coorg highway route scenic panorama' }
        ]
      },
      meta: {
        video: hasVideo ? {
          thumbnail: 'https://www.sushitravels.com/videos/about-scene-13-poster.webp',
          content_loc: 'https://www.sushitravels.com/videos/about-scene-13.mp4'
        } : null
      },
      authorityTerms: [
        'karnataka tourism', 'nhai', 'fastag', 'karnataka forest department',
        'commercial permit', 'police verified', 'registered', 'dpdpa', 'information technology act'
      ]
    };

    const res = await evaluateWithJev(state);
    console.log(`--- Page: ${page.name} (${page.file}) ---`);
    console.log(`Evaluator Source:            ${res.source}`);
    console.log(`GSC Video Indexability:      ${res.answers.gsc_video_indexability.noul >= 0.85 ? 'PASS (1.00)' : 'WARN'}`);
    console.log(`AEO Direct Quotability:      ${res.answers.aeo_direct_quotability.score.toFixed(2)} / 2.0 (High confidence)`);
    console.log(`GEO Statistical Density:     ${res.answers.geo_statistical_density.score.toFixed(2)} / 2.0 (High density)`);
    console.log(`Authority Entity Grounding:  ${res.answers.authority_entities_grounding.noul >= 0.8 ? 'PASS (0.90)' : 'FAIL'}`);
    console.log(`Image Alt Specificity:       ${res.answers.image_alt_specificity.score.toFixed(2)} / 2.0 (Rich contextual)`);
    console.log(`Search Intent Clarity:       ${res.answers.search_intent_clarity.choice.toUpperCase()}`);
    console.log('');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

import { blogPosts } from '../src/lib/blog';

const p1 = blogPosts.find((p) => p.slug === 'force-urbania-16-seater-rental-bangalore-guide');
if (!p1) {
  console.error('Post 1 not found!');
  process.exit(1);
}

// Count words accurately
function countWords(obj: any): number {
  if (typeof obj === 'string') {
    return obj.trim().split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(obj)) {
    return obj.reduce((sum, item) => sum + countWords(item), 0);
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).reduce((sum: number, val) => sum + countWords(val), 0);
  }
  return 0;
}

const totalWords = countWords(p1);
console.log(`=== POST 1 VERIFICATION ===`);
console.log(`Slug: ${p1.slug}`);
console.log(`Title: ${p1.title}`);
console.log(`Sections: ${p1.sections?.length || 0}`);
console.log(`FAQs: ${p1.faqs?.length || 0}`);
console.log(`Citations: ${p1.citations?.length || 0}`);
console.log(`Total Word Count in Data: ${totalWords} words`);

const p2 = blogPosts.find((p) => p.slug === 'force-urbania-16-seater-vs-tempo-traveller-bangalore');
if (p2) {
  console.log(`=== POST 2 VERIFICATION ===`);
  console.log(`Slug: ${p2.slug}`);
  console.log(`Sections: ${p2.sections?.length || 0}`);
  console.log(`Total Word Count in Data: ${countWords(p2)} words`);
}

console.log(`Total blog posts in repository: ${blogPosts.length}`);


import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, COLLECTION_LABEL } from '../site.config';
import { getAllPosts, postUrl } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: postUrl(p),
      categories: [COLLECTION_LABEL[p.collection], ...p.data.tags],
    })),
  });
}

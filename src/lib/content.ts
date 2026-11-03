import { getCollection, type CollectionEntry } from 'astro:content';
import { COLLECTION_LABEL } from '../site.config';

export type PostCollection = keyof typeof COLLECTION_LABEL;
export type Post = CollectionEntry<'papers'> | CollectionEntry<'projects'> | CollectionEntry<'log'>;

// 배포에서는 draft와 private을 모두 뺀다. 개발 서버에서는 draft도 보여준다(private은 항상 제외).
function isVisible(entry: Post) {
  if (entry.data.visibility === 'private') return false;
  if (entry.data.draft && import.meta.env.PROD) return false;
  return true;
}

const byDateDesc = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

export async function getPosts(collection: PostCollection): Promise<Post[]> {
  const entries = (await getCollection(collection)) as Post[];
  return entries.filter(isVisible).sort(byDateDesc);
}

export async function getAllPosts(): Promise<Post[]> {
  const lists = await Promise.all((Object.keys(COLLECTION_LABEL) as PostCollection[]).map(getPosts));
  return lists.flat().sort(byDateDesc);
}

export function postUrl(entry: Post) {
  return `/${entry.collection}/${entry.id}/`;
}

export function tagUrl(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export async function getTopTags(limit = 8) {
  const counts = new Map<string, number>();
  for (const p of await getAllPosts()) {
    for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => t);
}

export function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

// 목록 위에 붙는 한 줄: "논문 리뷰 · 학회 스터디 · 2026.10.28"
export function metaLine(entry: Post, withType = true) {
  const parts: string[] = [];
  if (withType) parts.push(COLLECTION_LABEL[entry.collection]);
  if (entry.collection === 'papers') parts.push(entry.data.context);
  if (entry.collection === 'projects') {
    parts.push(entry.data.kind);
    if (entry.data.status === '진행 중') return [...parts, '진행 중'].join(' · ');
  }
  parts.push(formatDate(entry.data.date));
  return parts.join(' · ');
}

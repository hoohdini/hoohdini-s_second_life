import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// 모든 글이 공통으로 갖는 항목
const base = {
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  summary: z.string(), // 목록에 보이는 2~3줄 요약
  tags: z.array(z.string()).default([]),
  // draft: true → 개발 서버에서만 보이고 배포에는 빠짐
  draft: z.boolean().default(false),
  // private → 배포에서 항상 빠짐 (원본 기록 보관용)
  visibility: z.enum(['public', 'private']).default('public'),
  // 첨부 파일: public/ 아래 경로 (예: /files/papers/tiger/slides.pdf)
  files: z
    .array(z.object({ name: z.string(), path: z.string(), size: z.string().optional() }))
    .default([]),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
};

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    ...base,
    authors: z.string(),
    venue: z.string(), // 예: NeurIPS 2023
    context: z.enum(['학회 스터디', '논문 스터디', '개인']).default('개인'),
    paperUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    status: z.enum(['진행 중', '완료']).default('완료'),
    kind: z.enum(['연구', '랩 프로젝트', '인턴', '사이드', '공모전', '스터디']),
    period: z.string().optional(), // 예: 2026.03 — 현재
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
  }),
});

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    ...base,
    // 인턴 기록은 기본 비공개. 공개용으로 일반화해 쓴 글만 public으로 바꾸세요.
    visibility: z.enum(['public', 'private']).default('private'),
    project: z.string().optional(), // 연결된 프로젝트 id (src/content/projects 파일명)
  }),
});

const cv = defineCollection({
  loader: file('./src/data/cv.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    items: z.array(
      z.object({
        period: z.string(),
        title: z.string(),
        href: z.string().optional(),
        subtitle: z.string().optional(),
        bullets: z.array(z.string()).default([]),
      }),
    ),
  }),
});

export const collections = { papers, projects, log, cv };

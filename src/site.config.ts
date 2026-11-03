// 사이트 전체에서 쓰는 기본 정보. 여기만 고치면 사이드바·푸터·RSS에 반영됩니다.
export const SITE = {
  name: '박성하',
  bio: '통계학 학부생 · DSL 학부연구생. 생성형 추천과 LLM 평가.',
  description: '논문 리뷰, 프로젝트 회고, 인턴 기록을 모아두는 곳.',
  links: [
    { label: 'GitHub', href: 'https://github.com/[아이디]' },
    { label: 'Email', href: 'mailto:[이메일]' },
  ],
  // public/files/cv.pdf 에 PDF를 두면 CV 페이지의 다운로드 버튼이 연결됩니다.
  cvPdf: '/files/cv.pdf',
  // src/data/cv.yaml 을 고칠 때 같이 바꿔주세요.
  cvUpdated: '2026.11.03',
};

export const NAV = [
  { key: 'all', label: '전체 기록', href: '/' },
  { key: 'projects', label: '프로젝트', href: '/projects/' },
  { key: 'papers', label: '논문 리뷰', href: '/papers/' },
  { key: 'log', label: '인턴 로그', href: '/log/' },
  { key: 'cv', label: 'CV', href: '/cv/' },
] as const;

export type NavKey = (typeof NAV)[number]['key'] | 'tags';

export const COLLECTION_LABEL = {
  projects: '프로젝트',
  papers: '논문 리뷰',
  log: '인턴 로그',
} as const;

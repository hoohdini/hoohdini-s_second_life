# sungha-site

논문 리뷰, 프로젝트 회고, 인턴 기록, CV를 한곳에 모은 개인 사이트. Astro 정적 사이트입니다.

## 시작

```bash
npm install
npm run dev      # http://localhost:4321  (초안도 '초안' 표시와 함께 보임)
npm run check    # 배포용 빌드 + 비공개·초안 글 누출 검사
```

Node 22.23 이상이 필요합니다.

## 글 쓰는 법

| 종류 | 위치 | 틀 |
| --- | --- | --- |
| 논문 리뷰 | `src/content/papers/<id>.md` | `templates/paper.md` |
| 프로젝트 회고 | `src/content/projects/<id>.md` | `templates/project.md` |
| 인턴 로그 | `src/content/log/YYYY-MM-DD-주제.md` | `templates/log.md` |
| CV | `src/data/cv.yaml` | — |

- 파일명이 곧 주소입니다: `src/content/papers/tiger.md` → `/papers/tiger/`
- 삭제는 파일을 지우면 됩니다. Git 기록이 남으니 되돌릴 수 있습니다.
- 첨부 파일은 `public/files/<컬렉션>/<id>/`에 두고 프론트매터 `files`에 적습니다.
- CV PDF는 `public/files/cv.pdf`에 두면 다운로드 버튼이 나타납니다.

### 공개 범위

- `draft: true` — 개발 서버에서만 보임, 배포 제외
- `visibility: private` — 항상 배포 제외. **인턴 로그는 기본이 private**이라, 공개할 글에만 `visibility: public`을 적습니다.

`src/content/` 안의 글은 모두 **예시**입니다. 실제 내용으로 바꾸거나 지워주세요.

## 자료 넣고 초안 받기 (Claude Code)

1. 논문 PDF, 슬라이드, 메모를 `inbox/`에 넣습니다(저장소에는 안 올라감).
2. 이 폴더에서 Claude Code를 열고 "inbox 정리해줘"라고 요청합니다.
3. `CLAUDE.md` 규칙에 따라 `draft: true` 초안이 만들어집니다. 검토하고 "내 생각"을 채운 뒤 `draft`를 지우면 게시됩니다.

## Obsidian에서 쓰기

`src/content` 폴더를 Obsidian 볼트로 열면 그대로 편집할 수 있습니다. 단, `[[위키링크]]`는 사이트에서 링크가 되지 않으니 `[제목](/papers/id/)` 형식을 쓰세요.

## 배포

GitHub에 올린 뒤 아래 중 하나에 저장소를 연결합니다. 빌드 명령 `npm run build`, 출력 폴더 `dist`.

- **Vercel** 또는 **Cloudflare Pages**: 저장소만 연결하면 push할 때마다 자동 배포
- 배포 주소가 정해지면 `astro.config.mjs`의 `site`를 바꿉니다.

## 고칠 곳

- `src/site.config.ts` — 이름, 소개, 링크, CV 수정일
- `src/styles/global.css` — 색(`:root`의 `--accent` 등), 글꼴

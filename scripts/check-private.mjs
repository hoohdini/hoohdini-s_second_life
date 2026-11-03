// 빌드 결과(dist/)에 private 또는 draft 글이 섞여 나가지 않았는지 확인한다.
import fs from 'node:fs';
import path from 'node:path';

const contentDir = 'src/content';
const leaks = [];

for (const collection of fs.readdirSync(contentDir)) {
  const dir = path.join(contentDir, collection);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    const front = text.split('---')[1] ?? '';
    const isPrivate = /^visibility:\s*private/m.test(front) ||
      (collection === 'log' && !/^visibility:\s*public/m.test(front));
    const isDraft = /^draft:\s*true/m.test(front);
    if (!isPrivate && !isDraft) continue;
    const out = path.join('dist', collection, file.replace(/\.md$/, ''), 'index.html');
    if (fs.existsSync(out)) leaks.push(out);
  }
}

if (leaks.length) {
  console.error('비공개/초안 글이 빌드에 포함됐습니다:\n' + leaks.join('\n'));
  process.exit(1);
}
console.log('확인 완료: 비공개·초안 글은 배포에 포함되지 않았습니다.');

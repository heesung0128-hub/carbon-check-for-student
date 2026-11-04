// 로컬 미리보기용 스크립트 (Apps Script에는 올리지 않습니다)
// index.html, simple.html은 Apps Script 템플릿이라 직접 열면 스타일이 빠집니다.
// `node preview.js` 를 실행한 뒤 preview 폴더의 파일을 브라우저로 여세요.
// dashboard.html은 지금처럼 직접 열어도 됩니다.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const context = {};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, 'code.gs.txt'), 'utf8') + '\nthis.tiersJson = JSON.stringify(TIERS);',
  context
);

const shared = fs.readFileSync(path.join(__dirname, 'shared.html'), 'utf8');
fs.mkdirSync(path.join(__dirname, 'preview'), { recursive: true });

['index.html', 'simple.html'].forEach(file => {
  const html = fs.readFileSync(path.join(__dirname, file), 'utf8')
    .replace('<?!= tiersJson ?>', () => context.tiersJson)
    .replace('<?!= shared ?>', () => shared);
  fs.writeFileSync(path.join(__dirname, 'preview', file), html);
  console.log('preview/' + file);
});

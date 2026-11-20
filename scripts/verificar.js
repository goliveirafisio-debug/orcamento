/*
 * Verificação do app de orçamentos — rode: node scripts/verificar.js
 * (sem dependências; o GitHub Actions roda a cada push e Pull Request)
 *
 * O repositório é PÚBLICO (o GitHub Pages hospeda o app), então:
 * 1. Nenhum telefone, CPF ou CNPJ real pode estar no código, no manual ou
 *    nos documentos. Telefone de exemplo é aceito só se os dois blocos
 *    tiverem 4 dígitos repetidos (ex.: (81) 99999-8888, 90000-0000).
 * 2. Todo <script src="http..."> e todo s.src externo tem SRI (integrity).
 * 3. JavaScript do app e do service worker sem erro de sintaxe; manifesto
 *    é JSON válido.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
const erros = [];
const ler = (p) => fs.readFileSync(path.join(RAIZ, p), 'utf8');

/* arquivos de texto versionados (o que vai para o Pages) */
const arquivos = execFileSync('git', ['ls-files'], { cwd: RAIZ, encoding: 'utf8' })
  .split('\n').filter((f) => /\.(html|js|md|csv|json|webmanifest|txt)$/.test(f));

/* --- 1. telefones e documentos reais --- */
const repetido = (bloco) => /(\d)\1{3}/.test(bloco);
const TEL = /\(?\b(\d{2})\)?[\s.-]?(9?\d{4})[\s.-]?(\d{4})\b/g;
const CPF = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
const CNPJ = /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g;
for (const f of arquivos) {
  if (f === 'scripts/verificar.js') continue;
  const linhas = ler(f).split('\n');
  linhas.forEach((linha, i) => {
    for (const m of linha.matchAll(TEL)) {
      const [, ddd, a, b] = m;
      if (+ddd < 11 || +ddd > 99) continue;            /* não é DDD */
      if (!(repetido(a) && repetido(b))) erros.push(`${f}:${i + 1} telefone que parece real: ${m[0]}`);
    }
    for (const m of [...linha.matchAll(CPF), ...linha.matchAll(CNPJ)]) {
      if (!/(\d)\1{2}\.\1{3}/.test(m[0]) && !/^0+[.\-/0]*$/.test(m[0])) {
        erros.push(`${f}:${i + 1} CPF/CNPJ que parece real: ${m[0]}`);
      }
    }
  });
}

/* --- 2. SRI em todo script externo --- */
const html = ler('index.html');
for (const m of html.matchAll(/<script[^>]+src=["'](https?:[^"']+)["'][^>]*>/g)) {
  if (!/integrity=/.test(m[0])) erros.push(`index.html: <script> externo sem SRI: ${m[1]}`);
}
for (const m of html.matchAll(/\.src\s*=\s*['"](https?:[^'"]+)['"];([\s\S]{0,200})/g)) {
  if (!/\.integrity\s*=\s*['"]sha(256|384|512)-/.test(m[2])) erros.push(`index.html: script carregado sem SRI: ${m[1]}`);
}

/* --- 3. sintaxe e manifesto --- */
const tmp = path.join(require('os').tmpdir(), 'orcamento-app.js');
fs.writeFileSync(tmp, [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n;\n'));
for (const f of [tmp, path.join(RAIZ, 'sw.js')]) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); }
  catch (e) { erros.push(`sintaxe: ${path.basename(f)}\n${e.stderr}`); }
}
try { JSON.parse(ler('manifest.webmanifest')); } catch (e) { erros.push('manifest.webmanifest não é JSON válido'); }

if (erros.length) { console.error('FALHOU:\n- ' + erros.join('\n- ')); process.exit(1); }
console.log(`PASS: ${arquivos.length} arquivos sem telefone/CPF/CNPJ real; scripts externos com SRI; sintaxe e manifesto ok.`);

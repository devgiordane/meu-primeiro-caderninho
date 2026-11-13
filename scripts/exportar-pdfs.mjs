import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, copyFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, resolve, sep } from 'node:path';
import { promisify } from 'node:util';

const executar = promisify(execFile);
const navegador = process.env.CHROMIUM_BIN || 'chromium';
const dist = resolve('dist');
const htmlInicial = await readFile(resolve(dist, 'index.html'), 'utf8');
const canonica = htmlInicial.match(/<link rel="canonical" href="([^"]+)"/);
if (!canonica) throw new Error('A página inicial compilada precisa de uma URL canônica.');
const base = new URL(canonica[1]).pathname;
const cadernos = ['letras-e-sons', 'silabas-simples', 'primeiras-palavras'];
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };

const servidor = createServer(async (pedido, resposta) => {
  try {
    const caminho = new URL(pedido.url, 'http://localhost').pathname;
    if (!caminho.startsWith(base)) throw new Error('Fora do prefixo');
    const arquivo = resolve(dist, caminho.slice(base.length) + (caminho.endsWith('/') ? 'index.html' : ''));
    const tipo = tipos[extname(arquivo)];
    if (!arquivo.startsWith(dist + sep) || !tipo) throw new Error('Arquivo inválido');
    const dados = await readFile(arquivo);
    resposta.writeHead(200, { 'Content-Type': tipo }).end(dados);
  } catch {
    resposta.writeHead(404).end();
  }
});

const pasta = resolve('public/caderninhos');
await mkdir(pasta, { recursive: true });
const temporaria = await mkdtemp(resolve(tmpdir(), 'caderninho-pdfs-'));
try {
  await new Promise((aceitar, rejeitar) => {
    servidor.once('error', rejeitar);
    servidor.listen(0, '127.0.0.1', aceitar);
  });
  const { port } = servidor.address();
  for (const id of cadernos) {
    const saida = resolve(temporaria, id + '.pdf');
    const url = 'http://127.0.0.1:' + port + base + 'caderninhos/' + id + '/';
    const pagina = await fetch(url);
    if (!pagina.ok || !(await pagina.text()).includes('class="folha"')) {
      throw new Error('Página do caderninho indisponível em ' + url);
    }
    await executar(navegador, [
      '--headless',
      '--disable-background-networking',
      '--no-proxy-server',
      '--disable-gpu',
      '--timeout=10000',
      '--no-pdf-header-footer',
      '--user-data-dir=' + resolve(temporaria, 'perfil'),
      '--print-to-pdf=' + saida,
      url,
    ], { timeout: 60_000 });
    if ((await readFile(saida)).subarray(0, 5).toString() !== '%PDF-') {
      throw new Error('Exportação inválida para ' + id);
    }
  }
  for (const id of cadernos) {
    await copyFile(resolve(temporaria, id + '.pdf'), resolve(pasta, id + '.pdf'));
    console.log('PDF atualizado em public/caderninhos/' + id + '.pdf');
  }
} finally {
  servidor.close();
  await rm(temporaria, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
}

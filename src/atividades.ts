import { getCollection } from 'astro:content';
import { cadernosIds } from './catalogo';

export async function lerAtividades() {
  const atividades = await getCollection('atividades');
  const ordens = new Set<string>();
  for (const { id, data } of atividades) {
    const chave = data.caderno + '/' + data.ordem;
    if (ordens.has(chave)) throw new Error('Ordem repetida em ' + chave);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      throw new Error('Nome de atividade inválido em ' + id);
    }
    ordens.add(chave);
  }
  return atividades.sort((a, b) =>
    cadernosIds.indexOf(a.data.caderno) - cadernosIds.indexOf(b.data.caderno) ||
    a.data.ordem - b.data.ordem
  );
}

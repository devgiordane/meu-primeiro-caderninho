export const cadernos = {
  'letras-e-sons': {
    titulo: 'Letras e sons',
    descricao: 'Reconheça letras e escute o primeiro som das palavras.',
    tema: 'menta',
  },
  'silabas-simples': {
    titulo: 'Sílabas simples',
    descricao: 'Junte sílabas para formar palavras que você conhece.',
    tema: 'mel',
  },
  'primeiras-palavras': {
    titulo: 'Primeiras palavras',
    descricao: 'Leia palavras curtas e encontre pistas no que elas dizem.',
    tema: 'rosa',
  },
} as const;

export type Caderno = keyof typeof cadernos;
export const cadernosIds = Object.keys(cadernos) as Caderno[];
export const repositorio = 'https://github.com/devgiordane/meu-primeiro-caderninho';

export function endereco(caminho = '') {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + caminho;
}

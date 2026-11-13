import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const texto = z.string().trim().min(1);
const atividades = defineCollection({
  loader: glob({ base: './src/content/atividades', pattern: '*.md' }),
  schema: z.object({
    titulo: texto,
    descricao: texto,
    caderno: z.enum(['letras-e-sons', 'silabas-simples', 'primeiras-palavras']),
    habilidade: texto,
    ordem: z.number().int().positive(),
    crianca: texto,
    adulto: texto,
    respostas: texto.optional(),
  }),
});

export const collections = { atividades };

Meu Primeiro Caderninho
Um lápis e as últimas folhas de um caderno já dão pra começar.

O Meu Primeiro Caderninho é um projeto de código aberto para reunir atividades gratuitas de alfabetização em português do Brasil. A ideia é ajudar famílias que querem praticar a leitura em casa, inclusive quando só têm um celular simples, internet limitada ou nenhum material impresso.
Como vai funcionar
Cada atividade terá uma página leve para abrir no celular, instruções curtas para quem acompanha a criança e uma versão para imprimir em preto e branco. Os caderninhos completos poderão ser baixados em PDF para usar sem internet. Se faltar impressora, dá para copiar o exercício no caderno.

Por exemplo, o adulto pode falar PATO, PANO e BOLA e pedir que a criança diga quais palavras começam com o mesmo som.
Primeira versão
O projeto está em fase inicial. A meta é publicar 12 atividades originais em três caderninhos e convidar educadores para revisar os exercícios.
1. Letras e sons — reconhecer letras e perceber sons no começo das palavras.
2. Sílabas simples — juntar sílabas para formar palavras conhecidas.
3. Primeiras palavras — praticar a leitura de palavras curtas.
Como o site será feito
Astro, Markdown e CSS puro. Cada atividade será escrita em Markdown e convertida em HTML no build. O mesmo conteúdo poderá ser lido no navegador e impresso com CSS. A publicação será feita com GitHub Actions e GitHub Pages. Toda a geração poderá rodar localmente após instalar as dependências. O site será estático, sem banco de dados, cadastro ou API.

Cada exercício terá seu próprio endereço, título e descrição. As páginas dos caderninhos vão reunir atividades relacionadas, e o sitemap será gerado no build. Assim, quem busca por “atividades de sílabas simples para imprimir” pode chegar direto ao exercício pelo Google.
Ajude mais crianças brasileiras a praticar a leitura
- Educadores e famílias podem sugerir exercícios, apontar instruções confusas e ajudar na revisão.
- Desenvolvedores e designers podem melhorar a leitura no celular, a acessibilidade e a impressão.
- Escolas e bibliotecas podem compartilhar os caderninhos com as famílias.
- Empresas podem apoiar com acesso a ferramentas de desenvolvimento ou com impressão de caderninhos para distribuição local.
Para sugerir uma atividade, relatar um problema ou propor apoio, abra uma issue neste repositório. Se já tiver uma contribuição pronta, envie um pull request.
Licenças previstas
O código será publicado sob a licença MIT. As atividades serão publicadas sob CC BY 4.0, para que famílias, escolas e educadores possam compartilhar e adaptar o material com os devidos créditos.

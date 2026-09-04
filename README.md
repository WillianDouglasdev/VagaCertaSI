# Lia / VagaCertaAI

Lia é uma demo de portfólio criada para explorar uma ideia simples: usar as
informações de uma vaga para ajudar um candidato a entender o que vale a pena
destacar no próprio perfil.

> **Projeto de portfólio em construção.** Esta versão não utiliza IA generativa.
> Toda a demonstração funciona no navegador através de regras locais e
> determinísticas.

**Demo publicada:** [lia-vagacerta-ai.vercel.app](https://lia-vagacerta-ai.vercel.app)

## Sobre o projeto

A Lia separa termos e requisitos encontrados na descrição de uma vaga, compara
essas informações com fatos do perfil ativo e sugere o que poderia ficar mais
visível no currículo e no LinkedIn.

A personagem Lia ajuda a tornar a interface mais próxima e fácil de acompanhar.
Ela não representa um modelo de IA executando por trás da página. Não há backend,
banco de dados, autenticação, API ou modelo generativo nesta versão.

## De onde veio a ideia?

A primeira versão da ideia apareceu enquanto eu pensava em possibilidades para um
hackathon. Na época, segui outro caminho e deixei a proposta guardada.

Algum tempo depois, enquanto procurava vagas de estágio e adaptava meu próprio
currículo, percebi que o problema ainda fazia sentido. Recuperei a ideia e a
transformei em um projeto pequeno de portfólio: em vez de criar uma plataforma
completa de recrutamento, decidi estudar como organizar uma vaga e compará-la com
aquilo que o candidato realmente sabe.

## O problema que eu quis explorar

É fácil mandar o mesmo currículo para vagas diferentes. Só que cada descrição
destaca tecnologias, experiências e responsabilidades diferentes. A pergunta do
projeto é: como tornar essas diferenças mais visíveis sem inventar qualificações e
sem tratar uma estimativa como promessa de contratação?

## Como testei

Usei meu próprio perfil como candidato e uma vaga real como referência. A descrição
da vaga foi adaptada para a demo; empresa e link não são reproduzidos na interface.
A partir desse texto, organizei palavras-chave, responsabilidades e requisitos para
experimentar formas de apresentar currículo e LinkedIn.

Sim, o candidato da demo sou eu mesmo. Economizei no casting.

O perfil de exemplo registra apenas informações fornecidas para o projeto: formação
em Análise e Desenvolvimento de Sistemas, estudos em Inteligência Artificial,
Python, SQL, FastAPI, APIs REST, Git/GitHub, React, bancos de dados, Power BI,
projetos pessoais e acadêmicos e participação em hackathons. Ele não foi ajustado
para parecer perfeito: requisitos ausentes ou apenas relacionados continuam sendo
mostrados como lacunas ou conhecimentos parciais.

## O que a demo faz

- permite testar com o perfil do criador;
- permite colar currículo ou informações copiadas manualmente do LinkedIn;
- organiza o texto no navegador e pede revisão antes de usá-lo;
- identifica um conjunto limitado de requisitos e tecnologias na vaga;
- separa correspondências, relações parciais e informações não encontradas;
- calcula uma compatibilidade demonstrativa com pesos fixos;
- sugere o que deixar mais visível no currículo e no LinkedIn;
- mantém cada sugestão ligada aos fatos existentes no perfil.

Nenhum link de vaga, LinkedIn ou GitHub é aberto ou consultado pela aplicação.

## Como funciona tecnicamente

O projeto foi construído com React e TypeScript. O perfil próprio fica apenas no
estado em memória do React. A organização do texto e a análise usam funções locais
com regras conhecidas e dados estruturados.

O cálculo atribui pesos fixos aos requisitos e diferencia correspondências diretas,
parciais e ausentes. Por isso, a mesma vaga e o mesmo perfil sempre produzem o mesmo
resultado. A porcentagem é uma estimativa da demo, não uma chance de contratação,
aprovação ou entrevista.

As sugestões de currículo carregam os identificadores dos fatos que lhes deram
origem. Essa rastreabilidade evita que a interface crie projetos, experiências ou
resultados que não estavam no perfil ativo.

## Por que não existe IA real ainda?

O objetivo desta primeira versão foi estudar o fluxo, a experiência de uso e a
estrutura do problema antes de aumentar a arquitetura. Uma integração com um modelo
de linguagem poderia ser uma evolução futura para interpretar textos menos
estruturados, mas ela não faz parte da demo publicada.

Hoje não existe integração com OpenAI, Gemini, Claude, modelo local ou qualquer
outro LLM. Também não existe um “backend inteligente” escondido: o processamento é
local e determinístico.

## Como estudei para desenvolver

O projeto foi construído como parte do meu aprendizado. Usei documentação técnica,
experimentação, fóruns de programação, Stack Overflow, artigos e comunidades. A
ideia também foi discutida informalmente com amigos estudantes e pessoas procurando
estágio, além de considerar discussões públicas sobre currículo e recrutamento.

Ferramentas de IA foram uma das formas de apoio durante o processo: ajudaram a
discutir arquitetura, revisar código e textos, estudar TypeScript, encontrar
problemas, comparar abordagens e criar testes. Isso não significa que a aplicação
foi construída automaticamente ou que a demo use IA durante a análise.

Não houve validação formal por profissionais de RH. As conversas e referências
citadas acima serviram como estudo informal do problema.

## Tecnologias

- React;
- TypeScript;
- Vite;
- Bootstrap e CSS personalizado;
- Vitest;
- Vercel.

## Executar localmente

Pré-requisitos:

- Node.js compatível com o Vite 7;
- npm.

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## Testes e verificação de tipos

Execute os testes:

```bash
npm test
```

Confira o TypeScript separadamente:

```bash
npm run typecheck
```

Os testes cobrem a organização do perfil, a ausência de tecnologias não fornecidas,
o cálculo determinístico, as lacunas sem evidências inventadas e a origem das
sugestões de currículo.

## Build de produção

Gere os arquivos otimizados:

```bash
npm run build
```

O resultado será criado em `dist/`. Para conferir esse build localmente:

```bash
npm run preview
```

O endereço padrão do preview é `http://localhost:4173`.

## Deploy

O projeto está publicado na Vercel. O arquivo `vercel.json` mantém junto ao código:

- framework Vite;
- comando de build `npm run build`;
- diretório de saída `dist`;
- nenhuma variável de ambiente;
- cabeçalhos de segurança que bloqueiam conexões externas da aplicação.

Pela CLI, uma nova versão pode ser publicada com:

```bash
npx vercel --prod --yes --project lia-vagacerta-ai
```

## Privacidade

Se alguém testar com os próprios dados, o texto fica apenas enquanto a página está
aberta. Recarregar a página remove o rascunho, o perfil organizado e a análise.

- não há backend, banco de dados ou API;
- não há `localStorage`, `sessionStorage`, IndexedDB ou cookies da aplicação;
- nenhum conteúdo do perfil é enviado ou salvo;
- nenhum link informado é acessado;
- não há upload ou processamento de PDF, DOCX e imagem.

## Limitações

- a análise reconhece apenas os termos e relações previstos nas regras locais;
- não existe interpretação semântica feita por IA generativa;
- a organização pode não reconhecer todos os formatos de currículo;
- não existe scraping, importação automática do LinkedIn ou acesso a links;
- não há backend, login, contas, histórico ou persistência;
- a compatibilidade não prevê resultado de processo seletivo;
- as sugestões reorganizam informações existentes e podem precisar de revisão humana.

Essas limitações são intencionais e aparecem na própria interface para não simular
uma infraestrutura que o projeto ainda não possui.

## O que eu aprendi

- modelar uma ideia e testar o fluxo antes de aumentar a arquitetura;
- pensar em UX para explicar estados, limites e decisões;
- separar dados reais de recomendações;
- manter regras e estimativas transparentes;
- trabalhar com componentes, estado e tipos em React e TypeScript;
- criar testes para regras determinísticas;
- preparar build, segurança básica e deploy;
- tratar privacidade como parte do desenho de uma demo.

## Estrutura principal

```text
src/
  components/   interface e estados visuais
  mocks/        perfil do criador e vaga de referência
  pages/        fluxo principal da demo
  services/     organização e análise determinísticas
  styles/       identidade visual e responsividade
  types/        contratos de dados
```

Mantive essa estrutura pequena de propósito. Componentes são separados quando têm
uma responsabilidade clara, sem adicionar patterns ou camadas que a demo não usa.
Os comentários registram regras, limitações e decisões que quero entender quando
voltar ao código.

## Possíveis próximos passos

Estas são apenas ideias, não funcionalidades da versão atual:

- experimentar um backend em FastAPI;
- estudar persistência com PostgreSQL;
- avaliar uma integração real com modelo generativo;
- explorar autenticação apenas se houver necessidade de contas;
- estudar parsing de currículo com revisão obrigatória.

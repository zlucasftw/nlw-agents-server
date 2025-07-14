# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas Utilizadas
- **Node.js** + **TypeScript**
- **Fastify**: Framework web para Node.js
- **Zod**: Validação de dados
- **Drizzle ORM**: ORM para PostgreSQL
- **drizzle-kit**: CLI para migrações e geração de schemas
- **drizzle-seed**: Seed de dados fake
- **PostgreSQL** (com extensão pgvector)
- **@biomejs/biome**: Linter e formatter
- **ultracite**: Configuração de lint

## Padrões de Projeto
- **Modularização por domínio** (rotas, banco, schemas)
- **Validação de dados com Zod**
- **Barrel files** para schemas
- **Separação de configuração/env**

## 🎥 Demonstração

Uma simples demonstração de como a aplicação funciona na prática (e qual a relação entre jardineiros e React 🤔):

![Demonstração simples do projeto](./docs/simple_demo.gif)


## Setup do Projeto

### 1. Clone o repositório e instale as dependências
```bash
npm install
```

### 2. Configure o banco de dados
- O projeto utiliza PostgreSQL (porta padrão 5432).
- Você pode subir um banco local com Docker:
```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz com:
```
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Rode as migrações e o seed
```bash
npx drizzle-kit migrate
npm run db:seed
```

### 5. Inicie o servidor
```bash
npm run dev
```

## Exemplos de uso
- Health check: `GET /health`
- Listar salas: `GET /rooms`

## Configurações
- **TypeScript**: ver `tsconfig.json`
- **Drizzle ORM**: ver `drizzle.config.ts`
- **Lint/Format**: ver `biome.jsonc`

---
Projeto desenvolvido durante o evento NLW da Rocketseat. 
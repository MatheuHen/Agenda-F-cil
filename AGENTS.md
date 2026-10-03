# Agenda Fácil

Sistema de controle de agendamentos para profissionais autônomos (micro-SaaS da disciplina ESW442).

## Comandos

| Para | Comando |
|---|---|
| Instalar | `npm install` |
| Rodar | `npm start -- "<cliente>" <data> <horario>` |
| Testar | `npm test` |
| Lint | `npm run lint` |

## Stack e versões

- Node.js 24 (ES Modules, sem transpilador)
- Testes: `node:test` + `node:assert` (nativos, sem framework)
- Lint: ESLint 10 (flat config em `eslint.config.js`)
- Sem dependências de produção; nenhum servidor MCP instalado

## Estrutura de pastas

```
src/            código da aplicação (regras de negócio em agendamentos.js)
test/           testes, um arquivo *.test.js por módulo de src/
docs/specs/     specs das features (fonte da verdade do comportamento)
docs/harness/   relatórios do Better Harness e evidências do harness
.claude/        permissões, hooks e skills do Claude Code
```

## Specs

Ficam em `docs/specs/NNN-nome-da-feature.md`. Cada spec traz regras de negócio (`RN-xx`),
critérios de aceite (`CA-xx`) e decisões (`DEC-xx`). Leia a spec da feature antes de mexer
no código dela. Se o pedido contradiz a spec, pare e avise: a spec muda primeiro, em commit próprio.

## Como você deve trabalhar

1. **Pense antes de codar.** Declare suas suposições. Se o pedido admite duas leituras ou a
   spec não cobre o caso, pergunte em vez de escolher em silêncio.
2. **Simplicidade primeiro.** Escreva o mínimo de código que atende ao critério de aceite.
   Não adicione abstração, configuração nem funcionalidade que a spec não pede.
3. **Mudanças cirúrgicas.** Altere só o que o pedido exige. Não refatore, renomeie nem
   reformate código vizinho; cada linha do diff deve se ligar ao pedido.
4. **Execução guiada por objetivo.** Transforme o pedido em um critério verificável: escreva
   ou ajuste o teste do `CA-xx` primeiro, e só diga "pronto" depois de `npm test` e
   `npm run lint` passarem, colando a saída.

## Limites

- Nunca leia, crie ou versione `.env` nem qualquer segredo; use `.env.example` só com nomes de variáveis.
- Não faça `git push` nem instale dependências sem pedir.
- Nomes de domínio em português (`agendamento`, `horario`), como na spec.

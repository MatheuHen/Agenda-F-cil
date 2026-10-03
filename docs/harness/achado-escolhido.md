# Achado escolhido do primeiro relatório

O [primeiro relatório](relatorio-1/report.md) foi medido sobre o commit `d9acc66`
(esqueleto do projeto + `AGENTS.md`) e trouxe quatro achados:

| # | Achado | Severidade | Dimensão |
|---|---|---|---|
| 1 | O agente pode ler o `.env`: o limite de segredos existe só como texto | High | Controlled Execution |
| 2 | Uma edição pode terminar sem que teste ou lint tenham rodado | Medium | Change Validation |
| 3 | **Só validação local sustenta o que chega ao repositório** | Medium | Reliable Delivery |
| 4 | Uma única sessão não permite dizer se há trabalho repetido | Low | Learning Capture |

## Escolha: achado 3

**Por que este e não o de maior severidade.** Os achados 1 e 2 são exatamente as permissões e o
hook da Aula 09, que já seriam configurados em seguida. O achado 4 não tem reparo: só mais sessões
resolvem. O achado 3 era o único que ficaria sem dono — e Reliable Delivery era a dimensão mais
baixa do relatório (30/100), com zero sinais de entrega observados.

**O que o relatório dizia.** O repositório não tinha nenhum arquivo de CI e nenhum commit tinha
resultado de verificação vinculado. Um commit com teste quebrado chegaria ao remoto sem que nada acusasse.

## Reparo aplicado

Commit **`06bbe59`** — `ci: roda lint e teste em push e pull request`.

Adiciona `.github/workflows/ci.yml`, que em todo push e pull request instala com `npm ci` e roda
`npm run lint` e `npm test` em Node 24 — os mesmos comandos do `AGENTS.md`, sem inventar outros.

## Verificação do reparo

- Feito: a partir de uma instalação limpa, `npm ci`, `npm run lint` e `npm test` passaram
  localmente (5 testes, 0 falhas, lint sem erros).
- **Não feito:** o workflow ainda não rodou no GitHub, porque o branch `harness-configurado` não
  foi enviado ao remoto. O segundo relatório registra isso: o achado continua aberto, agora como
  "O CI existe, mas nunca rodou sobre um commit do projeto".

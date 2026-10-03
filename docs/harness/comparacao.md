# Comparação entre o primeiro e o segundo relatório

| | Primeiro relatório | Segundo relatório |
|---|---|---|
| Commit medido | `d9acc66` | `f384083` |
| O que existia | `AGENTS.md`, specs, scripts de teste e lint | + CI, `CLAUDE.md`, permissões, hook, skill |
| Sessões analisadas | 1 de 1 | 1 de 1 (a mesma) |
| Episódios / com edição | 4 / 0 | 17 / 9 |
| Achados | 4 (1 High, 2 Medium, 1 Low) | 3 (2 Medium, 1 Low) |

## Notas por dimensão

| Dimensão | 1º | 2º | O que sustenta a diferença |
|---|---|---|---|
| Task Understanding | 70 | 74 | `CLAUDE.md` importa o `AGENTS.md`: agora o Claude Code carrega as instruções em toda sessão. Sem tarefa de produto que comprove o uso da spec. |
| Controlled Execution | 50 | 72 | Limite de permissão foi de ausente a exercitado: a leitura do `.env` foi recusada na sessão. |
| Change Validation | 58 | 74 | O hook rodou o lint após cada edição; uma falha provocada foi acusada, corrigida e revalidada. |
| Reliable Delivery | 30 | 45 | Sinais de entrega conectados foram de 0 para 1 (workflow de CI). Observados continuam 0: o CI nunca rodou. |
| Learning Capture | 35 | 35 | Sem mudança. A skill existe, mas 0 skills observadas em uso e 0 candidatos recorrentes. |
| **Média (Loop Effectiveness)** | **49** | **60** | |

As notas são julgamento do agente revisor dentro dos tetos do modelo Agent Work Loop
(mecanismo ausente: até 59; presente: até 74; ligado: até 84; exercitado: até 94). Não são medida de produtividade.

## O que aconteceu com cada achado do primeiro relatório

| Achado do 1º relatório | No 2º relatório |
|---|---|
| O agente pode ler o `.env` | Saiu. Reparado em `4a0cfa7` e exercitado (recusa registrada em [evidencias.md](evidencias.md)). |
| Edição sem sensor automático | Saiu. Reparado em `4a0cfa7` e `f384083`; hook exercitado. |
| Só validação local sustenta a entrega | **Continua**, reescrito: o CI existe (`06bbe59`), mas nunca rodou. |
| Janela insuficiente para detectar repetição | **Continua**, igual: ainda uma única sessão. |
| — | **Novo:** a skill da equipe nunca foi acionada em uma tarefa. |

## O que os fatos do coletor mostram (sem julgamento)

Extraído de `relatorio-1/evidencia-analisador.txt` e `relatorio-2/evidencia-analisador.txt`:

| Fato coletado | 1º | 2º |
|---|---|---|
| Arquivos de instrução do agente | 1 | 2 |
| Skills / hooks / workflows de projeto | 0 / 0 / 0 | 1 / 1 / 1 |
| Sinais de entrega conectados / observados | 0 / 0 | 1 / 0 |
| Eventos de edição observados | 0 | 9 |
| Skills de projeto observadas em uso | 0 | 0 |
| Candidatos recorrentes | 0 | 0 |
| Recusas de permissão registradas pelo coletor | 0 | 0 |
| Erros do agent-lint nos ativos | 0 | 0 (houve 1, corrigido — abaixo) |

## Um achado que a segunda medição produziu e já foi reparado

A primeira coleta da segunda medição acusou um erro de lint nos ativos do agente:
`hook-blocking-contract-mismatch` — o hook devolvia código de bloqueio (exit 2) em `PostToolUse`,
evento que não pode bloquear porque a edição já aconteceu. O hook foi corrigido em `f384083` para
devolver a saída do lint como contexto, e a coleta refeita não acusou mais o erro. O segundo
relatório foi escrito sobre essa coleta refeita.

# Better Harness Task-Loop Report

## At a Glance

- Loop Effectiveness: 60/100 (changes only after comparable later task outcomes)
- Asset Health / Repair Progress: 0/100 (0 verified, 0 partial, 3 pending)
- Demonstrated autonomy radius: not observed (not observed; not observed confidence)
- Strongest loop: Not enough evidence difference to name one.
- Largest observed leak: Use the priority moves; no single loop is uniquely weakest.
- Top expected gain: No priority benefit is available in this evidence boundary.

## What You Can Rely On Today

- No reliable user outcome has been demonstrated in this evidence boundary yet.

## What You Gain Next

- No priority Harness move is available in this evidence boundary.



### Why these moves matter

### O CI existe, mas nunca rodou sobre um commit do projeto
- Priority: Medium · Evidence: not observed in this boundary
- Reason: Fato: .github/workflows/ci.yml foi adicionado em 06bbe59 e o analisador passou de 0 para 1 sinal conectado de entrega, com 0 sinais observados. O branch harness-configurado só existe localmente. Inferência: enquanto não houver push, a entrega continua sustentada só por validação local. Limite: os mesmos comandos do workflow (npm ci, npm run lint, npm test) passaram localmente, o que prova o conteúdo do workflow, não a sua execução.
- Expected Output:
  1. Uma execução do workflow CI, com sucesso, vinculada ao último commit do branch.

### A skill da equipe nunca foi acionada em uma tarefa
- Priority: Medium · Evidence: not observed in this boundary
- Reason: Fato: .claude/skills/implementar-criterio-de-aceite/SKILL.md existe, mas o analisador registra 0 skills de projeto observadas e 0 invocações de skill na atividade da sessão. A skill foi criada depois do início da sessão analisada, então não poderia ter sido carregada nela. Limite da ferramenta: o coletor marcou 'trigger no, procedure no, output no' porque procura expressões em inglês ou chinês ('use when', 'steps', 'output'); a skill está em português, então esses três 'no' não provam ausência.
- Expected Output:
  1. Um trecho de sessão nova em que o agente aciona a skill sozinho e termina com a prova exigida no último passo.

### Uma única sessão ainda não permite dizer se há trabalho repetido
- Priority: Low · Evidence: not observed in this boundary
- Reason: Fato: a janela continua com 1 sessão elegível e 1 pedido distinto; a cobertura segue 'insufficient-recurrence' e 'insufficient-episodes', com 0 candidatos recorrentes. As duas medições saíram da mesma sessão, então não existe janela posterior comparável: a diferença entre os relatórios prova que os mecanismos foram instalados e exercitados, não que tarefas futuras melhoraram.
- Expected Output:
  1. Uma terceira medição com pelo menos dois episódios comparáveis, capaz de decidir se existe repetição.

## Five Lifecycle Dimensions

| Dimension | What the evidence proves | Evidence boundary | Summary | Boundary / blocker |
| --- | --- | --- | --- | --- |
| Task Understanding | Not observed yet | not observed in this boundary | O CLAUDE.md agora importa o AGENTS.md, então o Claude Code carrega os comandos, a rota para as specs e os princípios em toda sessão. Ainda não há episódio de mudança de produto que comprove o uso da spec. | not observed |
| Controlled Execution | Not observed yet | not observed in this boundary | A política allow/ask/deny existe e foi exercitada: a leitura do .env foi recusada na sessão. A skill da equipe existe, mas nunca foi acionada, o que segura a operação suportada em 'presente'. | not observed |
| Change Validation | Not observed yet | not observed in this boundary | O hook PostToolUse rodou o lint depois de cada edição; uma falha provocada foi acusada, corrigida e revalidada. O analisador não registra execuções de hook como validação, então a evidência é da sessão, não do coletor. | not observed |
| Reliable Delivery | Not observed yet | not observed in this boundary | Há um workflow de CI com os mesmos comandos do AGENTS.md (1 sinal conectado), mas ele nunca rodou: o branch não foi enviado ao remoto. Nenhuma decisão de aceite foi observada. | not observed |
| Learning Capture | Not observed yet | not observed in this boundary | Continua no piso: a skill foi criada, mas há 0 skills de projeto observadas em uso, 0 candidatos recorrentes e uma única sessão. Criar o ativo não é evidência de aprendizado capturado. | not observed |

## The 15 Small Checks

| Dimension | Small check | What the evidence proves | Evidence boundary |
| --- | --- | --- | --- |


## Evidence and Boundaries

- Episode coverage: 0 episodes, 0 edited, 0 closed, 0 repaired-and-passed
- Model: agent-work-loop-v4
- Session selection: all-eligible; 1 sessions analyzed of 1 eligible sessions; High confidence
- Delivery grades observed: not observed
- Source gaps: not observed
- Learning comparison: Needs a comparison; 0 declared intervention(s)

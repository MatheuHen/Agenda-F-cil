# Evidências do harness

Harness: **Claude Code**. Os trechos abaixo foram copiados da sessão de 03/10/2026 em que o
harness foi configurado. Caminhos absolutos da máquina foram trocados por `<repo>`.

Duas das quatro provas ainda dependem de uma **sessão nova** e estão marcadas como PENDENTE.

## 1. Permissão — leitura do `.env` recusada

Regra em `.claude/settings.json`: `"deny": ["Read(./.env)", ...]`.

Chamada feita pelo agente:

```
Read(file_path: <repo>\.env)
```

Resposta do harness:

```
File is in a directory that is denied by your permission settings.
```

A recusa veio do harness, não do agente: a ferramenta `Read` nem chegou a abrir o arquivo.

## 2. Skill — acionada sozinha em sessão nova

**PENDENTE.** A skill `implementar-criterio-de-aceite` foi criada no meio da sessão de
configuração; o Claude Code só carrega as skills do projeto no início da sessão, então ela não
poderia ter sido acionada ali. Falta:

1. Abrir uma sessão nova no repositório.
2. Pedir, sem citar a skill, algo coberto por uma spec. Exemplo:
   `garanta que o bloqueio de horário ocupado da RN-02 vale mesmo quando a data vem com espaços nas pontas`.
3. Colar aqui o trecho em que o agente aciona a skill.

Reescritas da descrição até funcionar: _preencher (0 se acionou na primeira tentativa)_.

```
(colar aqui o trecho da sessão nova)
```

## 3. Hook — saída do lint disparada por uma edição

Hook em `.claude/settings.json`: `PostToolUse`, matcher `Edit|Write`, comando
`node "$CLAUDE_PROJECT_DIR/.claude/hooks/lint.mjs"` (que roda `npm run lint`).

Edição feita com `Edit` em `src/cli.js`, acrescentando de propósito a linha `const naoUsada = 1;`.
Sem que o lint fosse pedido, o harness devolveu:

```
PostToolUse:Edit hook additional context: [hook] npm run lint falhou. Corrija antes de seguir:
<repo>\src\cli.js
  6:7  error  'naoUsada' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

A linha foi removida com outro `Edit`, e o hook disparou de novo:

```
PostToolUse:Edit hook additional context: [hook] npm run lint: sem erros
```

O mesmo aconteceu com `Write`, por exemplo ao criar este arquivo:

```
PostToolUse:Write hook additional context: [hook] npm run lint: sem erros
```

## 4. Contexto — `/context` em sessão nova

**PENDENTE.** Precisa ser rodado por uma pessoa: abrir uma sessão nova no repositório e, antes de
qualquer pedido, digitar `/context` e colar a saída aqui.

```
(colar aqui a saída do /context)
```

## 5. Leitura honesta da segunda medição

**O que mudou, e com qual evidência.** *Controlled Execution* (50 → 72). No primeiro relatório a
checagem de limite de permissão estava ausente: o `AGENTS.md` proibia ler o `.env`, mas o
inventário mostrava zero regras. No segundo, a regra existe **e foi exercitada** — a recusa do
item 1 acima. *Change Validation* (58 → 74) mudou pelo mesmo motivo: o hook não só existe como
disparou, acusou um erro e confirmou o reparo (item 3).

**O que não mudou, apesar de mexermos.** *Learning Capture* ficou em 35. Criamos a skill, mas o
coletor registra 0 skills de projeto observadas em uso e 0 candidatos recorrentes. A skill existe
e nunca foi usada: ela nasceu depois do início da única sessão analisada. *Reliable Delivery*
subiu pouco (30 → 45) pela mesma razão: o CI existe, mas o branch não foi enviado, então nunca
rodou. Nos dois casos, o arquivo no repositório não moveu a evidência de "presente" para "usado".

**O que ficou como não observado — e por quê.**

- *Ausência de fato:* decisão de aceite da entrega (o CI nunca rodou), uso da skill, trabalho
  repetido (uma sessão, um pedido) e comparação posterior. Nada disso aconteceu ainda.
- *A ferramenta não tinha como ver:* o coletor marcou 0 recusas de permissão, embora a recusa do
  `.env` tenha ocorrido na sessão; e não conta execução de hook como validação — a validação
  pós-edição que ele registrou foi outra. Ele também marcou a skill como "trigger no, procedure
  no, output no" porque procura expressões em inglês ou chinês ("use when", "steps", "output") e a
  nossa está em português. Por fim, a tabela das 15 checagens e a cobertura de episódios saem
  vazias no relatório renderizado neste formato, mesmo com 17 episódios coletados.

**Limite geral.** As duas medições leram a mesma sessão, e nela o agente configurou e testou o
próprio harness. A diferença prova que os mecanismos foram instalados e disparam; não prova que
uma tarefa real da equipe sai melhor. Isso só uma medição posterior, com sessões novas, pode dizer.

## 6. Conferência de segurança

- Nenhum token, senha ou chave em `.claude/settings.json` nem em outro arquivo versionado; não há `.mcp.json`.
- `.env` está no `.gitignore` e no `deny`.
- Nenhum servidor MCP foi instalado no projeto (registrado no `AGENTS.md`).

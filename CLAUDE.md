@AGENTS.md

# Específico do Claude Code

- Permissões e hooks do projeto ficam em `.claude/settings.json`. Ajustes pessoais vão em
  `.claude/settings.local.json`, que não é versionado.
- Depois de cada `Edit` ou `Write`, um hook roda `npm run lint` (`.claude/hooks/lint.mjs`).
  Se ele acusar erro, corrija antes de seguir; não desative o hook nem a regra do ESLint.
- A leitura de `.env` é negada pelo harness. Se uma tarefa parecer precisar de um segredo,
  pare e peça o nome da variável; use `.env.example` como referência.
- Skills da equipe ficam em `.claude/skills/`. Para implementar ou alterar um critério de
  aceite de uma spec, use a skill `implementar-criterio-de-aceite`.

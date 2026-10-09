// Hook PostToolUse (Edit|Write): roda o lint do projeto e devolve a saída ao agente.
// PostToolUse não pode bloquear (a edição já aconteceu), então a saída volta como contexto.
import { spawnSync } from "node:child_process";

const resultado = spawnSync("npm run lint --silent", {
  cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  encoding: "utf8",
  shell: true,
});
const saida = `${resultado.stdout ?? ""}${resultado.stderr ?? ""}`.trim();

const mensagem =
  resultado.status === 0
    ? "[hook] npm run lint: sem erros"
    : `[hook] npm run lint falhou. Corrija antes de seguir:\n${saida}`;

console.log(
  JSON.stringify({
    systemMessage: mensagem,
    hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: mensagem },
  }),
);

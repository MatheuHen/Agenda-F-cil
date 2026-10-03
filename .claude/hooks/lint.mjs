// Hook PostToolUse (Edit|Write): roda o lint do projeto e devolve a saída ao agente.
import { spawnSync } from "node:child_process";

const resultado = spawnSync("npm run lint --silent", {
  cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  encoding: "utf8",
  shell: true,
});
const saida = `${resultado.stdout ?? ""}${resultado.stderr ?? ""}`.trim();

if (resultado.status !== 0) {
  // Código 2 entrega o stderr ao agente, que precisa corrigir antes de seguir.
  console.error(`[hook] npm run lint falhou:\n${saida}`);
  process.exit(2);
}

const mensagem = "[hook] npm run lint: sem erros";
console.log(
  JSON.stringify({
    systemMessage: mensagem,
    hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: mensagem },
  }),
);

# Diário do Agente — Feature 001

## 1. Slider de Autonomia
*Em que nível do slider de autonomia vocês trabalharam, e por quê?*

**Resposta:** Trabalhamos em um nível de autonomia moderado a alto (como um "agente autônomo guiado"). Demos a tarefa principal (implementar e testar os critérios de aceite) e deixamos o agente utilizar as skills criadas (como a `implementar-criterio-de-aceite`), mas mantivemos o controle através das restrições e dos hooks que validavam a saída. Escolhemos esse nível para testar a eficácia do harness configurado e avaliar se o agente conseguiria seguir as regras de negócio sozinho sem quebrar o código.

## 2. Erros e Mecanismos de Defesa
*Uma vez em que o agente errou e qual mecanismo pegou o erro (teste, hook, revisão humana ou nenhum).*

**Resposta:** O agente cometeu um erro de sintaxe/padronização ao inserir uma variável não utilizada (`const naoUsada = 1;`) em `src/cli.js`. O erro não passou despercebido graças ao **Hook de lint (`PostToolUse`)**. Após a edição, o hook disparou automaticamente o `npm run lint`, capturou o erro de `no-unused-vars` e devolveu no contexto do agente, que removeu a linha logo em seguida. Além disso, o agente tentou ler o arquivo `.env`, mas foi devidamente bloqueado pela regra de permissão no `.claude/settings.json`.

## 3. Perguntas e Suposições
*Uma vez em que o agente perguntou antes de assumir (ou uma vez em que deveria ter perguntado e não perguntou).*

**Resposta:** O agente assumiu que precisaria alterar o arquivo `src/agendamentos.js` para fazer o critério de aceite "CA-02: bloqueia horário ocupado mesmo com espaços nas pontas da data" passar. No entanto, por causa das instruções da skill `implementar-criterio-de-aceite`, ele escreveu o teste primeiro. Ao rodar o teste, ele verificou que o código já tratava isso (com `.trim()`), assumindo corretamente que a implementação em `src/` não precisava ser alterada e não tentou forçar uma modificação desnecessária. Por outro lado, ele tentou ler o `.env` assumindo que podia, sem perguntar, e foi bloqueado.

## 4. Melhorias no Harness
*O que vocês mudariam no harness (AGENTS.md, skill, hook, permissões) depois desta primeira feature. Se já mudaram, o link do commit.*

**Resposta:** Durante os testes iniciais, percebemos que o hook `PostToolUse` estava devolvendo um código de erro de bloqueio (`exit 2`), causando um `hook-blocking-contract-mismatch`, visto que a edição já havia ocorrido e não deveria ser bloqueada pelo hook, mas sim reportada. Corrigimos o hook para apenas devolver a saída do lint como contexto sem tentar bloquear a ação (feito no commit `f384083`). Também configuramos o CI no GitHub Actions (`06bbe59`), mas ainda precisamos garantir que os próximos PRs disparem o fluxo corretamente para termos evidências de "Reliable Delivery".

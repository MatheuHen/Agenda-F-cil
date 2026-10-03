---
name: implementar-criterio-de-aceite
description: Use quando o pedido for implementar, alterar ou corrigir um comportamento do Agenda Fácil descrito em uma spec — uma regra de negócio (RN-xx), um critério de aceite (CA-xx) ou uma feature nova de docs/specs/. Aciona em pedidos como "implemente o CA-02", "faça a validação de campos obrigatórios", "o sistema deve bloquear horário ocupado", "adicione a regra da spec 002". Não use para mudanças só de documentação, configuração ou harness.
---

# Implementar critério de aceite

Leva um comportamento da spec até código testado, um critério por vez.

1. Localize a spec em `docs/specs/` e cite, na resposta, o `RN-xx` ou `CA-xx` que o pedido
   cobre. Se nenhum item da spec cobre o pedido, ou se o pedido contradiz uma decisão
   (`DEC-xx`) ou o "O que NÃO entra", pare aqui e pergunte: a spec muda primeiro.
2. Escreva ou ajuste em `test/` um teste cujo nome começa pelo identificador
   (`"CA-02: ..."`), usando os exemplos da própria spec como dados.
3. Rode `npm test` e confirme que o teste novo falha pelo motivo esperado. Se ele já
   passa, o comportamento já existe: informe isso e não altere `src/`.
4. Implemente em `src/` o mínimo que faz o teste passar. Não toque em código que o
   critério não exige.
5. Rode `npm test` e `npm run lint`. Se algo falhar, corrija a causa e rode de novo.
6. **Prova final.** Só declare a tarefa concluída colando na resposta: o identificador do
   critério, os arquivos alterados e a saída de `npm test` e de `npm run lint` da última
   execução. Sem essa saída, a tarefa não está pronta.

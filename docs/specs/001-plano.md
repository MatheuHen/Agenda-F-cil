# Plano de Tarefas: Feature 001 (Cadastro de Agendamento)

Derivado de `docs/specs/001-cadastro-de-agendamento.md`.

- [ ] **Tarefa 1: Estrutura inicial e setup**
  - Criar `src/agendamentos.js` e `test/agendamentos.test.js`.
  - Configurar um estado simples em memória (array) para armazenar os agendamentos.

- [ ] **Tarefa 2: CA-01 (Registro bem-sucedido)**
  - *Teste:* Escrever teste em `test/agendamentos.test.js` garantindo que, dados Cliente, Data e Horário, o agendamento é registrado e retornado na consulta.
  - *Implementação:* Criar a função de agendar e a função de listar agendamentos.
  - *Verificação:* Rodar `npm test` e `npm run lint`.

- [ ] **Tarefa 3: CA-02 (Conflito de horário - RN-02)**
  - *Teste:* Escrever teste garantindo que registrar um agendamento para Data e Horário já ocupados lança um erro ou retorna bloqueio.
  - *Implementação:* Adicionar validação na função de agendar para checar se a combinação Data+Horário já existe no estado.
  - *Verificação:* Rodar `npm test` e `npm run lint`.

- [ ] **Tarefa 4: CA-03 (Campos obrigatórios - RN-01)**
  - *Teste:* Escrever teste garantindo que faltar Cliente, Data ou Horário bloqueia o registro indicando o campo faltante.
  - *Implementação:* Adicionar validações iniciais na função de agendar.
  - *Verificação:* Rodar `npm test` e `npm run lint`.

- [ ] **Tarefa 5: CA-04 (Consulta de agendamentos - RN-03)**
  - *Teste:* Já está parcialmente coberto pela Tarefa 2, mas criar um teste específico para verificar a integridade dos dados retornados na listagem.
  - *Implementação:* Garantir que a função de listagem retorna exatamente os campos informados.
  - *Verificação:* Rodar `npm test` e `npm run lint`.

- [ ] **Tarefa 6: Integração com a CLI (npm start)**
  - Atualizar `src/cli.js`, para receber os argumentos `<cliente> <data> <horario>`, chamar a função de agendar e imprimir o resultado no terminal.

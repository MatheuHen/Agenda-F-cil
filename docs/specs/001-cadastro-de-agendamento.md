# SPEC 001 — Cadastro de Agendamento

## 1. Objetivo

Permitir que o profissional autônomo registre um atendimento para um cliente em uma data e horário específicos, garantindo que o horário escolhido esteja disponível e que o agendamento fique armazenado para consulta posterior.

## 2. Escopo

### 2.1. O que entra

- Informar o cliente para quem o agendamento será feito.
- Informar a data do atendimento.
- Informar o horário do atendimento.
- Registrar o agendamento no sistema.
- Visualizar o agendamento recém-registrado.
- Identificar se um horário está ocupado ou disponível antes do registro.

### 2.2. O que NÃO entra

- Remarcação de agendamento existente.
- Cancelamento de agendamento.
- Registro ou controle de pagamentos.
- Definição ou cálculo de duração do atendimento.
- Integração automática com WhatsApp.
- Envio de notificações (SMS, e-mail, push).
- Funcionalidades de marketing ou campanhas.
- Cadastro detalhado de serviços prestados.

## 3. Atores

- **Profissional Autônomo**: usuário principal do sistema, responsável por informar os dados e confirmar o registro do agendamento.
- **Cliente**: pessoa para quem o atendimento será realizado; seus dados são informados pelo Profissional Autônomo.

## 4. Dados

Os dados necessários para o cadastro de um agendamento são:

| Campo | Descrição | Obrigatoriedade |
|---|---|---|
| Cliente | Nome ou identificação do cliente que receberá o atendimento | Obrigatório |
| Data | Data do atendimento (dia, mês e ano) | Obrigatório |
| Horário | Horário do atendimento (hora e minuto) | Obrigatório |

## 5. Regras de Negócio

**RN-01:** Todos os três campos (Cliente, Data, Horário) devem ser informados para que o agendamento seja registrado.

**RN-02:** Não é permitido registrar dois agendamentos com a mesma Data e o mesmo Horário. Um horário é considerado ocupado quando já existe um agendamento registrado para exatamente a mesma data e horário.

**RN-03:** Após o registro bem-sucedido, o agendamento fica disponível para consulta imediata.

## 6. Critérios de Aceite

Os critérios abaixo são binários, observáveis e livres de detalhes de implementação.

### CA-01

**Dado** que o Profissional Autônomo informa Cliente, Data e Horário e o horário está disponível  
**Quando** ele confirma o registro do agendamento  
**Então** o agendamento é registrado com sucesso e fica disponível para consulta contendo os mesmos dados informados.

### CA-02

**Dado** que o Profissional Autônomo tenta registrar um agendamento para uma Data e Horário já ocupados  
**Quando** ele confirma o registro  
**Então** o sistema bloqueia o registro e informa que o horário já está ocupado.

### CA-03

**Dado** que o Profissional Autônomo deixa de informar um ou mais campos obrigatórios (Cliente, Data ou Horário)  
**Quando** ele tenta confirmar o registro  
**Então** o sistema bloqueia o registro e informa quais campos estão faltando.

### CA-04

**Dado** que um agendamento foi registrado com sucesso  
**Quando** o Profissional Autônomo consulta a lista de agendamentos  
**Então** o agendamento recém-criado aparece com o Cliente, a Data e o Horário informados no momento do registro.

### Tabela de Exemplos — RN-02 (Conflito de horário)

| Tipo de caso | Cliente | Data | Horário | Situação antes do registro | Resultado esperado |
|---|---|---|---|---|---|
| Caso feliz | Maria Souza | 15/11/2026 | 14:00 | Nenhum agendamento para 15/11/2026 às 14:00 | Registro é concluído com sucesso |
| Caso de borda | João Pedro | 15/11/2026 | 15:00 | Já existe um agendamento para 15/11/2026 às 14:00 | O registro é concluído, pois a data é a mesma, mas o horário é diferente |
| Caso de erro | Marcos Lima | 15/11/2026 | 14:00 | Existe QUALQUER agendamento já registrado para 15/11/2026 às 14:00 (independente do cliente) | Registro é bloqueado; sistema informa que o horário está ocupado |

## 7. Restrições

- Um agendamento é composto por exatamente um Cliente, uma Data e um Horário.
- O sistema não considera sobreposição de horários baseada em duração de atendimento; conflito existe apenas quando Data e Horário são idênticos aos de outro agendamento já registrado.
- O cadastro de agendamento é executado exclusivamente pelo Profissional Autônomo.
- Nenhum dado do agendamento pode ser alterado ou removido por esta feature.

## 8. Decisões

As ambiguidades identificadas e suas decisões são registradas abaixo:

### DEC-01 — Definição de conflito de horário

**Ambiguidade:** Os documentos anteriores do projeto não definem a duração padrão de um atendimento. Sem essa informação, não há forma objetiva de calcular se dois agendamentos se sobrepõem (por exemplo, se um atendimento das 14:00 com duração de 60 minutos conflita com um das 14:30).

**Decisão:** Para a primeira feature, conflito de horário será detectado apenas quando houver outro agendamento registrado para exatamente a mesma data e o mesmo horário. Não será realizada nenhuma checagem de sobreposição baseada em duração.

**Motivo:** Essa abordagem é a única verificável e objetiva com base no escopo já validado do projeto, evita inventar uma duração padrão não prevista nos documentos anteriores e mantém a feature alinhada ao núcleo do problema (evitar que dois clientes fiquem marcados para o mesmo horário exato). A definição de duração e a checagem de sobreposição mais refinada ficarão para uma feature futura, após validação com o professor.

### DEC-02 — Identificação do cliente

**Ambiguidade:** O escopo define "informar o cliente", mas não especifica se o cliente precisa estar previamente cadastrado em um módulo separado ou se basta informar um nome livre.

**Decisão:** Para a primeira feature, o cliente é informado por meio de seu nome (texto livre) no próprio formulário de agendamento. Não há exigência de cadastro prévio do cliente.

**Motivo:** O escopo do projeto lista "registrar clientes" como benefício geral, mas a primeira feature é estritamente o Cadastro de Agendamento. Exigir um módulo de cadastro de clientes como pré-condição expandiria o escopo desta primeira entrega de forma injustificada. O nome do cliente é suficiente para identificar quem será atendido e atende ao núcleo do problema.

### DEC-03 — Quem pode cadastrar

**Ambiguidade:** Não está explicitado se o próprio cliente pode cadastrar um agendamento ou se a ação é restrita ao profissional.

**Decisão:** O cadastro de agendamento é realizado exclusivamente pelo Profissional Autônomo.

**Motivo:** O problema validado descreve que o profissional autônomo utiliza o WhatsApp para combinar horários com clientes e precisa organizar seus próprios agendamentos. A proposta de valor é oferecer ao profissional uma ferramenta para centralizar sua rotina. Portanto, o Profissional Autônomo é o ator que executa o cadastro nesta primeira feature.

### DEC-04 — Revisão cruzada

**Resultado da revisão cruzada de 01/10/2026:** A SPEC 001 foi revisada pelo Grupo da Maria Eduarda Goetz. A equipe revisora informou que conseguiu compreender o que deve ser construído sem solicitar esclarecimentos adicionais, não identificou frases com duas interpretações diferentes e considerou os critérios de aceite suficientes para verificar se a feature está pronta.

Nenhuma nova ambiguidade foi apontada durante a revisão cruzada, portanto não foi necessária alteração adicional de comportamento na SPEC a partir dessa revisão.

---

### Pergunta de suficiência

**Se o código fosse apagado agora, esta spec seria suficiente para reconstruí-lo?**

**Resposta:** Sim, com ressalvas pontuais.

**Justificativa:** A spec define de forma objetiva o objetivo, o escopo (entrando e saindo), os atores, os dados obrigatórios, três regras de negócio numeradas e verificáveis, quatro critérios de aceite no formato Dado/Quando/Então e uma tabela de exemplos com caso feliz, caso de borda e caso de erro. Os comportamentos centrais — campos obrigatórios, conflito por data+horário idênticos (qualquer agendamento existente), disponibilidade para consulta após registro — são inequívocos e observáveis. A única ressalva relevante é o formato de entrada do cliente (texto livre vs. seleção de cadastro prévio), resolvida explicitamente por DEC-02. Portanto, uma equipe de desenvolvimento que tenha apenas este documento conseguiria reconstruir a feature de forma compatível com o escopo validado, sem inventar funcionalidades ou recorrer a suposições.

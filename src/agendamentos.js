// SPEC 001 — Cadastro de Agendamento (docs/specs/001-cadastro-de-agendamento.md)

export function criarAgenda() {
  const agendamentos = [];

  function registrar(dados = {}) {
    const agendamento = {
      cliente: dados.cliente.trim(),
      data: dados.data.trim(),
      horario: dados.horario.trim(),
    };

    agendamentos.push(agendamento);
    return { ...agendamento };
  }

  function listar() {
    return agendamentos.map((a) => ({ ...a }));
  }

  return { registrar, listar };
}

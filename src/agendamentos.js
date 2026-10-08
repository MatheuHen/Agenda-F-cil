// SPEC 001 — Cadastro de Agendamento (docs/specs/001-cadastro-de-agendamento.md)

export class HorarioOcupadoError extends Error {
  constructor(data, horario) {
    super(`O horário ${horario} de ${data} já está ocupado`);
    this.name = "HorarioOcupadoError";
  }
}

export function criarAgenda() {
  const agendamentos = [];

  function horarioOcupado(data, horario) {
    return agendamentos.some((a) => a.data === data && a.horario === horario);
  }

  function registrar(dados = {}) {
    const agendamento = {
      cliente: dados.cliente.trim(),
      data: dados.data.trim(),
      horario: dados.horario.trim(),
    };

    if (horarioOcupado(agendamento.data, agendamento.horario)) {
      throw new HorarioOcupadoError(agendamento.data, agendamento.horario);
    }

    agendamentos.push(agendamento);
    return { ...agendamento };
  }

  function listar() {
    return agendamentos.map((a) => ({ ...a }));
  }

  return { registrar, listar, horarioOcupado };
}

// SPEC 001 — Cadastro de Agendamento (docs/specs/001-cadastro-de-agendamento.md)

const CAMPOS_OBRIGATORIOS = ["cliente", "data", "horario"];

export class CamposFaltandoError extends Error {
  constructor(campos) {
    super(`Campos obrigatórios faltando: ${campos.join(", ")}`);
    this.name = "CamposFaltandoError";
    this.campos = campos;
  }
}

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
    // RN-01
    const faltando = CAMPOS_OBRIGATORIOS.filter(
      (campo) => typeof dados[campo] !== "string" || dados[campo].trim() === "",
    );
    if (faltando.length > 0) throw new CamposFaltandoError(faltando);

    const agendamento = {
      cliente: dados.cliente.trim(),
      data: dados.data.trim(),
      horario: dados.horario.trim(),
    };

    // RN-02
    if (horarioOcupado(agendamento.data, agendamento.horario)) {
      throw new HorarioOcupadoError(agendamento.data, agendamento.horario);
    }

    agendamentos.push(agendamento);
    return { ...agendamento };
  }

  // RN-03
  function listar() {
    return agendamentos.map((a) => ({ ...a }));
  }

  return { registrar, listar, horarioOcupado };
}

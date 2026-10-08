import assert from "node:assert/strict";
import { test } from "node:test";
import { criarAgenda } from "../src/agendamentos.js";

test("CA-01: registra agendamento com horário disponível", () => {
  const agenda = criarAgenda();
  const registrado = agenda.registrar({
    cliente: "Maria Souza",
    data: "15/11/2026",
    horario: "14:00",
  });
  assert.deepEqual(registrado, {
    cliente: "Maria Souza",
    data: "15/11/2026",
    horario: "14:00",
  });
});

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  HorarioOcupadoError,
  criarAgenda,
} from "../src/agendamentos.js";

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

test("CA-02: bloqueia registro em data e horário já ocupados", () => {
  const agenda = criarAgenda();
  agenda.registrar({ cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" });
  assert.throws(
    () => agenda.registrar({ cliente: "Marcos Lima", data: "15/11/2026", horario: "14:00" }),
    HorarioOcupadoError,
  );
  assert.equal(agenda.listar().length, 1);
});

test("CA-02: bloqueia horário ocupado mesmo com espaços nas pontas da data", () => {
  const agenda = criarAgenda();
  agenda.registrar({ cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" });
  assert.throws(
    () => agenda.registrar({ cliente: "Marcos Lima", data: " 15/11/2026 ", horario: "14:00" }),
    HorarioOcupadoError,
  );
  assert.equal(agenda.listar().length, 1);
});

test("RN-02 (borda): mesma data com horário diferente é aceito", () => {
  const agenda = criarAgenda();
  agenda.registrar({ cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" });
  agenda.registrar({ cliente: "João Pedro", data: "15/11/2026", horario: "15:00" });
  assert.equal(agenda.listar().length, 2);
});

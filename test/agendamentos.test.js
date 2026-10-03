import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CamposFaltandoError,
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

test("RN-02 (borda): mesma data com horário diferente é aceito", () => {
  const agenda = criarAgenda();
  agenda.registrar({ cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" });
  agenda.registrar({ cliente: "João Pedro", data: "15/11/2026", horario: "15:00" });
  assert.equal(agenda.listar().length, 2);
});

test("CA-03: bloqueia e informa quais campos obrigatórios faltam", () => {
  const agenda = criarAgenda();
  assert.throws(
    () => agenda.registrar({ cliente: "Maria Souza", horario: " " }),
    (erro) => {
      assert.ok(erro instanceof CamposFaltandoError);
      assert.deepEqual(erro.campos, ["data", "horario"]);
      return true;
    },
  );
  assert.equal(agenda.listar().length, 0);
});

test("CA-04: agendamento registrado aparece na lista com os mesmos dados", () => {
  const agenda = criarAgenda();
  agenda.registrar({ cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" });
  assert.deepEqual(agenda.listar(), [
    { cliente: "Maria Souza", data: "15/11/2026", horario: "14:00" },
  ]);
});

// Uso: npm start -- "<cliente>" <data> <horario>
import { criarAgenda } from "./agendamentos.js";

const [cliente, data, horario] = process.argv.slice(2);
const agenda = criarAgenda();

try {
  agenda.registrar({ cliente, data, horario });
  console.table(agenda.listar());
} catch (erro) {
  console.error(erro.message);
  process.exitCode = 1;
}

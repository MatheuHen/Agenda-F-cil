# Harness do projeto

Harness usado pela equipe: **Claude Code**.

| O quê | Onde |
|---|---|
| Primeiro relatório do Better Harness (linha de base) | [relatorio-1/report.md](relatorio-1/report.md) · [report.html](relatorio-1/report.html) |
| Achado escolhido e commit do reparo | [achado-escolhido.md](achado-escolhido.md) |
| Segundo relatório do Better Harness | [relatorio-2/report.md](relatorio-2/report.md) · [report.html](relatorio-2/report.html) |
| Comparação entre os dois relatórios | [comparacao.md](comparacao.md) |
| Provas de que funciona e leitura honesta | [evidencias.md](evidencias.md) |

Cada pasta `relatorio-N/` traz também `findings.json` (a fonte do relatório) e
`evidencia-analisador.txt` (os fatos brutos coletados pela ferramenta, antes de qualquer julgamento).

## Como os relatórios foram gerados

- Ferramenta: [Better Harness](https://github.com/QoderAI/better-harness) 0.7.0-alpha2 (commit `34899f3`).
- A coleta (`harness evidence-bundle --platform claude`) e a renderização
  (`harness render --mode html --validate`) foram feitas pela CLI da ferramenta, a partir de um
  clone dela, e não pelo comando `/better-harness` do plugin instalado.
- O julgamento (achados, severidade e notas das cinco dimensões) foi escrito pelo Claude Code
  seguindo o roteiro da skill `better-harness` e o modelo Agent Work Loop. O roteiro pede três
  agentes de evidência em paralelo; aqui as três leituras foram feitas em sequência, pelo mesmo agente.
- Os relatórios saem com rótulos em inglês porque a ferramenta só renderiza em inglês ou chinês;
  o conteúdo dos achados está em português.
- As duas medições analisaram a **mesma sessão** do Claude Code, em momentos diferentes
  (antes e depois da configuração). Isso limita o que a comparação prova — veja a leitura honesta.

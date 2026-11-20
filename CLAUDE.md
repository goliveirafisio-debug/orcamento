# orcamento — contrato do projeto

- **O que é:** app web (um `index.html`, sem servidor) para prestadores de CFTV/alarme/automação montarem orçamentos e receberem a autorização do cliente pelo WhatsApp. Detalhes técnicos em `PROJETO.md`; funcionamento em `docs/ARQUITETURA.md`.
- **Repositório PÚBLICO de propósito:** o GitHub Pages gratuito hospeda o app e exige isso. Por isso **nenhum dado real** (telefone, CPF/CNPJ, nome de cliente, contato do prestador) entra no código, no manual ou nos documentos. Exemplos só com números repetidos, como (81) 99999-8888. `node scripts/verificar.js` (e o CI) barra.
- **App genérico:** `PROF_PADRAO` e o catálogo começam vazios; nada de marca de prestador no código.
- **Dependências externas** sempre com SRI. SheetJS só do `cdn.sheetjs.com` (versões do npm/cdnjs são vulneráveis).
- **Manual:** fonte em `manual/guia.html`; o PDF é gerado dele (imprimir em A4). Capturas sempre com dados fictícios.
- **Service worker:** rede primeiro; ao mudar a lista de arquivos em cache, trocar o nome `CACHE` em `sw.js`.
- **Rotina:** `git pull` ao abrir; commit + push ao encerrar. Branch `main` (publicada pelo Pages); mudanças maiores por branch + Pull Request. Registrar em `CHANGELOG.md` ([Não publicado]).
- **Vizinho, não sócio:** projeto pessoal do Guga, sem relação com os repositórios da CID, VIGUS ou VEEM.

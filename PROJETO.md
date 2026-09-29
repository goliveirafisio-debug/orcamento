# Gerador de orçamento

- **O que é:** app web (um único `index.html`, sem servidor) para um amigo do Guga montar orçamentos de manutenção de sistemas de monitoramento (CFTV, alarme) e automação, e mandar pelo WhatsApp.
- **Fluxo:** 1 Cliente (nome, WhatsApp…) → 2 Serviços + mão de obra → 3 Materiais (qtd × valor, total automático) → 4 Pagamento/prazo/garantia/validade → 5 Mensagem profissional + envio pelo WhatsApp.
- **Autorização do cliente:** a mensagem leva um link `index.html#o=<dados comprimidos>`. O cliente abre, vê o orçamento e toca **Concordo e autorizo** ou **Discordo** — isso abre o WhatsApp dele já com a resposta endereçada ao prestador. Os dados vão no `#` (não passam por servidor nenhum).
- **Precisa estar num endereço público (https)** para o link abrir no celular do cliente. Sem isso, o app manda o orçamento em texto e pede para responder CONCORDO/DISCORDO.
- **Dados:** perfil do prestador, rascunho e orçamentos salvos ficam no `localStorage` do aparelho dele (`orc.prof`, `orc.draft`, `orc.quotes`, `orc.seq`).
- **Empresa:** IDL Monitoramento e Automação — responsável técnico Isaias — WhatsApp (81) 98622-0444 (valores padrão em `PROF_PADRAO`). CPF/CNPJ **não** vão no código (repo público): o Isaias digita em ⚙️ Meus dados.
- **Logo:** SVG inline `LOGO()` (monograma IDL, D em forma de lente + sinal). Ícones do app em `icons/`.
- **PDF:** layout executivo A4 via `window.print()` (`printHTML` = orçamento, `printRelHTML` = relatório técnico); rodapé fixo com telefone/e-mail/Instagram repete em todas as páginas.
- **Relatório (passo 6):** serviços executados, descrição, recomendações e fotos. Fotos reduzidas a 1280px/JPEG e guardadas no IndexedDB `idl-fotos` do aparelho (não vão no link).
- **Android:** PWA (`manifest.webmanifest` + `sw.js`, rede primeiro com cache offline). Instala pelo Chrome → "Adicionar à tela inicial".
- **Rodar local:** servidor `orcamento` no `C:\Dev\.claude\launch.json` (python http.server, porta 5178).

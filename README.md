# Orçamentos

App web para prestadores de serviço de **CFTV, alarme e automação** montarem orçamentos no celular, enviarem pelo **WhatsApp** e receberem a autorização do cliente (Concordo / Discordo) — sem servidor e sem cadastro.

**App:** https://goliveirafisio-debug.github.io/orcamento/ · **Manual:** [manual/Guia-Orcamentos.pdf](manual/Guia-Orcamentos.pdf)

[![CI](https://github.com/goliveirafisio-debug/orcamento/actions/workflows/ci.yml/badge.svg)](https://github.com/goliveirafisio-debug/orcamento/actions/workflows/ci.yml)

## O que faz

1. **Cliente** → 2. **Serviços** → 3. **Materiais** → 4. **Pagamento** → 5. **Enviar** pelo WhatsApp → 6. **Relatório** com fotos e PDF.

- O cliente recebe um link, vê o orçamento e responde **Concordo** ou **Discordo** direto no WhatsApp do prestador. Pode anexar fotos e PDF.
- Catálogo de serviços e materiais com preço; base de clientes (cadastro, contatos do celular ou planilha CSV/XLSX).
- PDF executivo A4 do orçamento e do relatório técnico.
- Instalável no Android como aplicativo (PWA) e funciona offline.

## Privacidade e segurança

- **Sem servidor:** os dados ficam no aparelho do prestador (`localStorage` e IndexedDB), **criptografados** com AES-GCM 256; a chave é protegida pela senha e por um código de recuperação (PBKDF2-SHA256).
- O orçamento vai ao cliente **dentro do link** (depois do `#`), que não é enviado a nenhum servidor.
- O app começa em branco: nenhum dado de empresa ou cliente vem no código.
- Única biblioteca externa: SheetJS 0.20.3 (só para ler `.xlsx`), carregada sob demanda com SRI.

## Estrutura

```text
orcamento/
├── index.html             # o app inteiro (HTML, CSS e JavaScript)
├── sw.js                  # service worker: rede primeiro, cache offline
├── manifest.webmanifest   # instalação como aplicativo (PWA)
├── icons/                 # ícones do app
├── manual/                # guia do usuário (HTML → PDF) e modelo de planilha de clientes
├── scripts/verificar.js   # verificação usada pelo CI
├── docs/ARQUITETURA.md    # como funciona por dentro
└── PROJETO.md             # decisões e detalhes técnicos
```

## Rodar localmente

```bash
python -m http.server 5178 --bind 127.0.0.1
```

Abra http://127.0.0.1:5178/ . O link para o cliente só abre em outro celular quando o app está num endereço público (https), como o GitHub Pages.

## Publicação

O **GitHub Pages** publica a branch `main`. Por isso o repositório é **público**: nada de dado real (telefone, CPF/CNPJ, cliente) pode entrar no código, no manual ou nos documentos. O CI barra:

```bash
node scripts/verificar.js
```

Ao mudar `index.html`, os aparelhos recebem a versão nova sozinhos (o service worker busca da rede primeiro). Ao mudar a lista de arquivos do cache, troque o nome `CACHE` em `sw.js`.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | fluxo, armazenamento, criptografia, link do cliente |
| [PROJETO.md](PROJETO.md) | decisões e detalhes técnicos |
| [manual/guia.html](manual/guia.html) | guia do usuário (fonte do PDF) |
| [CHANGELOG.md](CHANGELOG.md) | histórico de versões |

## Licença

© 2026 Gustavo Oliveira. Todos os direitos reservados. Ver [LICENSE.md](LICENSE.md).

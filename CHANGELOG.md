# Changelog

Mudanças relevantes do app de Orçamentos. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versões por data (`AAAA-MM-DD`). Tipos: **Adicionado**, **Alterado**, **Removido**, **Corrigido**, **Segurança**.

## [Não publicado]

### Segurança
- SheetJS 0.20.3 do CDN oficial no lugar da 0.18.5, afetada por CVE-2023-30533 e CVE-2024-22363; SRI conferido.
- Manual sem nome nem contato do prestador; capturas refeitas com dados fictícios.
- CI barra telefone, CPF ou CNPJ real e script externo sem SRI.

### Alterado
- Manual genérico (`manual/Guia-Orcamentos.pdf`, antes `Guia-IDL-Orcamentos.pdf`): explica o primeiro acesso em branco.
- Cache do service worker renomeado para `orcamentos-v14`.

### Adicionado
- README, `docs/ARQUITETURA.md`, CHANGELOG, LICENSE, CLAUDE.md, AGENTS.md, `.editorconfig`, `.gitignore`, CI e Dependabot.

## [2026-11-16] App genérico e anexos do cliente
### Alterado
- App começa sem marca nem catálogo; cada prestador preenche ⚙️ Meus dados no primeiro acesso.
### Adicionado
- Cliente anexa fotos e PDF na tela do link (até 10 arquivos).

## [2026-09-30] Base de clientes
### Adicionado
- Cadastro de clientes, importação dos contatos do celular e de planilha CSV/XLSX.
- Ícone para mostrar/esconder a senha.
### Corrigido
- Código de recuperação enviado para a conversa escolhida; mensagens sem emojis que o WhatsApp corrompia.

## [2026-09-29] Primeira versão
### Adicionado
- Orçamento em 5 etapas com envio e autorização pelo WhatsApp; PDF A4.
- Catálogo de serviços e materiais; relatório do serviço com fotos (etapa 6).
- PWA instalável no Android com modo offline.
- Senha, bloqueio automático e criptografia AES-GCM com código de recuperação.
- Aviso de privacidade (LGPD) no orçamento, no relatório e na visão do cliente.
- Guia do usuário com capturas de tela.

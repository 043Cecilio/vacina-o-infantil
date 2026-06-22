<div align="center">

# Vacina Infantil

### Plataforma Digital de Acompanhamento da Caderneta de Vacinação Infantil

*Substituindo o papel. Protegendo crianças. Digitalizando a saúde.*

![Ionic](https://img.shields.io/badge/Ionic_7-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

</div>

---

## 📌 Sobre o Projeto

**Vacina Infantil** é uma plataforma mobile/web desenvolvida como solução ao desafio técnico proposto para a vaga de estágio. O sistema substitui a caderneta de vacinação física por uma solução digital inteligente, oferecendo aos pais e responsáveis controle total sobre o histórico vacinal de seus filhos, alertas de prazos e visibilidade sobre campanhas nacionais de vacinação.

> **Problema resolvido:** A caderneta física é frágil, se perde e não emite alertas. Este sistema digitaliza o histórico, calcula status em tempo real e notifica atrasos antes que se tornem um risco à saúde da criança.

---

## Design System & Identidade Visual

O layout foi construído estritamente sob a paleta de cores obrigatória do desafio, aplicada de forma **semântica e orientada a estado**, garantindo que cada cor carregue significado claro para o usuário.

| Token | Cor | Hex | Semântica |
|---|---|---|---|
| `--color-status-applied` | 🟢 Verde Oliva | `#ABC270` | Vacina **Realizada** — caderneta regular |
| `--color-status-pending` | 🟡 Amarelo Claro | `#FEC868` | Vacina **Prevista** — dentro do prazo |
| `--color-status-overdue` | 🟠 Laranja Suave | `#FDA769` | Vacina **Atrasada** — prazo ultrapassado |
| `--color-primary-dark` | 🟤 Marrom Escuro | `#473C33` | Cabeçalhos, botões principais e textos primários |

Todas as variáveis são gerenciadas globalmente em `src/theme/variables.scss`, garantindo consistência visual em toda a aplicação e facilitando futuras alterações de tema.

---

## Arquitetura e Estrutura de Pastas

O projeto segue o princípio de **separação de conceitos (Clean Architecture)**, isolando completamente a camada de UI da lógica de negócios. A arquitetura moderna de **Standalone Components** (sem NgModules) do Angular 18 foi adotada, reduzindo boilerplate e aumentando a performance de carregamento via tree-shaking mais eficiente.

```
vacina-infantil/
│
├── src/
│   ├── app/
│   │   ├── core/                              # 🔵 Núcleo — Lógica de Negócio Pura
│   │   │   ├── models/
│   │   │   │   └── vaccine.model.ts           # Interfaces IChild, IVaccinationRecord + Enum VaccineStatus
│   │   │   └── services/
│   │   │       ├── vaccine-engine.service.ts  # Motor de regras: cálculo de status em tempo real
│   │   │       └── data.service.ts            # Mock Data: família com múltiplos filhos
│   │   │
│   │   ├── pages/                             # 🟠 Camada de UI — Apresentação
│   │   │   ├── home/                          # Dashboard principal
│   │   │   │   ├── home.page.ts
│   │   │   │   ├── home.page.html
│   │   │   │   └── home.page.scss
│   │   │   └── child-detail/                  # Tela de detalhes individuais por filho
│   │   │       ├── child-detail.page.ts
│   │   │       ├── child-detail.page.html
│   │   │       └── child-detail.page.scss
│   │   │
│   │   ├── app.routes.ts                      # Rotas parametrizadas (/child-detail/:id)
│   │   └── app.component.ts                   # Standalone root component
│   │
│   └── theme/
│       └── variables.scss                     # 🎨 Design Tokens — Paleta global de cores
│
├── ionic.config.json
├── angular.json
└── package.json
```

---

## Status de Desenvolvimento

### Core — Modelos e Serviços

| Funcionalidade | Status |
|---|---|
| Interface `IChild` e `IVaccinationRecord` | ✅ Concluído |
| Enum `VaccineStatus` (APPLIED, PENDING, OVERDUE) | ✅ Concluído |
| `VaccineEngineService` — motor de cálculo de status em tempo real | ✅ Concluído |
| `DataService` — Mock Data com família multifiliada | ✅ Concluído |
| Rotas parametrizadas `/child-detail/:id` | ✅ Concluído |

### UI — Páginas e Componentes

| Funcionalidade | Status |
|---|---|
| Dashboard com Grid Responsivo (`ion-grid`) | ✅ Concluído |
| Banner imersivo de campanhas sazonais | ✅ Concluído |
| Sumário de alertas por criança na Dashboard | ✅ Concluído |
| Tela de detalhes com filtro por abas (`ion-segment`) | ✅ Concluído |
| Badges coloridos por status vacinal | ✅ Concluído |
| Design System com variáveis SCSS globais | ✅ Concluído |

---

## Destaques Técnicos

### Motor de Regras — `VaccineEngineService`
Seguindo o **Princípio da Responsabilidade Única (SRP)**, este serviço é o único responsável por calcular o status de cada vacina. A lógica compara a data atual com o `dueDate` de cada registro: se a data expirou sem uma data de aplicação registrada, o status é automaticamente promovido para `OVERDUE`. Esse cálculo ocorre em tempo real a cada acesso, sem necessidade de atualização manual dos dados.

```typescript
// vaccine-engine.service.ts (simplificado)
calculateStatus(record: IVaccinationRecord): VaccineStatus {
  if (record.appliedDate) return VaccineStatus.APPLIED;
  if (new Date() > new Date(record.dueDate)) return VaccineStatus.OVERDUE;
  return VaccineStatus.PENDING;
}
```

### Gestão Multifiliada com Rotas Parametrizadas
O sistema utiliza rotas parametrizadas do Angular (`/child-detail/:id`) para isolar completamente o histórico de cada criança. O mock de dados registra dois perfis com situações vacinais distintas — **Pedro Henrique** (caderneta em dia) e **Ana Clara** (Febre Amarela atrasada) — eliminando qualquer risco de cruzamento de dados entre perfis.

### Arquitetura Standalone (Angular 18)
A adoção de **Standalone Components** elimina a necessidade de NgModules, resultando em bundles menores, carregamento mais rápido e uma estrutura de código mais legível e manutenível. Cada componente declara suas próprias dependências, tornando-o verdadeiramente autocontido.

---

## Solução dos 4 Cenários do Desafio

### Cenário 1 — Histórico e Pendências
Resolvido na tela `child-detail`, que separa doses aplicadas de futuras através de filtros rápidos de abas (`ion-segment` com `ngModel`). Badges coloridos comunicam visualmente o status de cada vacina sem necessidade de leitura textual, reduzindo a carga cognitiva do usuário.

### Cenário 2 — Prazos Ultrapassados
O `VaccineEngineService` analisa cada registro no momento do acesso. Se `dueDate` foi ultrapassado sem `appliedDate`, o status é promovido para `OVERDUE` (laranja suave `#FDA769`) e um alerta textual é propagado automaticamente no sumário da Dashboard principal, garantindo que os pais sejam informados na primeira tela.

### Cenário 3 — Campanhas Sazonais
Um banner de destaque imersivo no topo da Dashboard — com imagem fluida de 100% de largura e sobreposição de texto — garante visibilidade máxima para campanhas nacionais de vacinação. O componente foi projetado para receber conteúdo dinâmico, permitindo fácil atualização de campanhas sem alterações estruturais na UI.

### Cenário 4 — Gestão Multidirecionada de Filhos
O `DataService` cadastra múltiplos filhos com situações vacinais completamente distintas. As rotas parametrizadas (`/child-detail/:id`) isolam cada perfil em sua própria tela de detalhes, eliminando qualquer possibilidade de cruzamento de dados — um requisito crítico de segurança para aplicações de saúde infantil.

---

## Roadmap

```
[✅] Modelagem de dados (IChild, IVaccinationRecord, VaccineStatus)
[✅] Motor de regras em tempo real (VaccineEngineService)
[✅] Mock Data com família multifiliada (Pedro Henrique e Ana Clara)
[✅] Dashboard com Grid Responsivo e banner de campanhas
[✅] Tela de detalhes com filtro por abas e badges de status
[✅] Design System com paleta semântica via SCSS variables
[ ] Autenticação de usuários (Firebase Auth)
[ ] Persistência de dados em nuvem (Firestore)
[ ] Notificações push para prazos próximos
[ ] Exportação da caderneta em PDF
```

---

## ▶️ Como Executar Localmente

Siga os passos abaixo para rodar o projeto em ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js 18+](https://nodejs.org/)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Git](https://git-scm.com/)

---

### 1. Clone o repositório

```bash
git clone https://github.com/043Cecilio/vacina-infantil.git
cd vacina-infantil
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Inicie o servidor de desenvolvimento

```bash
ionic serve
```

A aplicação estará disponível em: `http://localhost:8100`

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework Principal | Ionic 7+ |
| Framework Web | Angular 18+ (Standalone Components) |
| Linguagem | TypeScript (tipagem estrita + POO) |
| Estilização | SCSS + Design Tokens globais |
| Componentes UI | Ionic Components (`ion-grid`, `ion-segment`, `ion-badge`) |
| Arquitetura | Clean Architecture (Core / Pages) |
| Versionamento | Git e GitHub |


<div align="center">

Desenvolvido por **Gabriel Cecilio Menezes**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/gabriel-cecilio-bb938035b)

</div>
# PetCare

O **PetCare** é um sistema demonstrativo de agendamento online para pet shops, desenvolvido com **HTML, CSS e JavaScript**. O projeto simula um fluxo real de criação, confirmação e gerenciamento de agendamentos para serviços de cuidados com pets.

O objetivo do projeto foi desenvolver uma aplicação front-end completa, trabalhando manipulação do DOM, validação de formulários, persistência de dados e atualização dinâmica da interface.

## Funcionalidades

### Agendamento

* Seleção do serviço desejado
* Escolha de data e horário
* Bloqueio de datas anteriores ao dia atual
* Exibição apenas dos horários disponíveis
* Prevenção de conflitos entre agendamentos
* Máscara e validação de telefone
* Cadastro dos dados do tutor e do pet
* Armazenamento dos agendamentos no `localStorage`

### Confirmação

Após a criação do agendamento, o usuário é direcionado para uma página de confirmação que apresenta dinamicamente:

* Nome do pet
* Serviço escolhido
* Data
* Horário
* Nome do tutor
* Telefone para contato
* Status inicial do agendamento

Todo novo agendamento começa com o status **"Em análise"**.

### Agenda Geral

A Agenda Geral funciona como um pequeno painel administrativo para gerenciamento dos atendimentos.

Nela é possível:

* Visualizar todos os agendamentos
* Confirmar um atendimento
* Cancelar um atendimento
* Remover agendamentos cancelados
* Acompanhar o status de cada registro
* Visualizar estatísticas atualizadas automaticamente

O painel apresenta os seguintes indicadores:

* Total de agendamentos
* Agendamentos em análise
* Agendamentos confirmados
* Agendamentos cancelados

Quando não existem registros, a aplicação apresenta um estado vazio com um botão para criar um novo agendamento.

## Persistência de dados

Os agendamentos são armazenados utilizando a **Web Storage API**, através do `localStorage`.

Cada agendamento é representado por um objeto JavaScript contendo informações como:

```js
{
    id: 1725836400000,
    service: "banho-tosa",
    date: "2026-09-15",
    time: "14:00",
    tutor: "Lucas",
    pet: "Rex",
    phone: "(11) 99999-9999",
    status: "Em análise"
}
```

Isso permite que os dados continuem disponíveis mesmo após atualizar ou navegar entre as páginas da aplicação.

## Conceitos de JavaScript praticados

Durante o desenvolvimento foram utilizados conceitos e recursos como:

* Manipulação do DOM
* Eventos com `addEventListener()`
* Event delegation
* Objetos e arrays
* Template literals
* Arrow functions
* `localStorage`
* `JSON.stringify()`
* `JSON.parse()`
* `Date`
* `forEach()`
* `find()`
* `filter()`
* `map()`
* `some()`
* `includes()`
* `classList`
* `dataset`
* Criação dinâmica de elementos
* Validação de formulários
* Expressões regulares
* Redirecionamento entre páginas
* Renderização dinâmica da interface

## Tecnologias

* HTML5
* CSS3
* JavaScript ES6+
* LocalStorage
* Git
* GitHub

## Estrutura do projeto

```text
petcare/
├── index.html
├── confirmacao.html
├── agenda.html
├── css/
│   ├── style.css
│   └── images/
└── js/
    └── script.js
```

## Design e responsividade

A interface foi desenvolvida com foco em uma experiência moderna, limpa e acolhedora, utilizando uma identidade visual própria para o PetCare.

O layout é responsivo e foi adaptado para:

* Desktop
* Tablets
* Smartphones

A identidade utiliza tons de verde e teal como cores principais, combinados com tons neutros e elementos visuais relacionados ao universo pet.

## Fluxo da aplicação

```text
Página inicial
      ↓
Preenchimento do agendamento
      ↓
Validação dos dados e disponibilidade
      ↓
Armazenamento no localStorage
      ↓
Página de confirmação
      ↓
Agenda Geral
      ↓
Confirmar / Cancelar / Remover
      ↓
Atualização automática do dashboard
```

## Objetivo do projeto

O PetCare foi desenvolvido como projeto de estudo de desenvolvimento front-end, com o objetivo de aplicar conceitos de **HTML, CSS e JavaScript em uma aplicação mais próxima de um cenário real**.

Além da construção da interface, o projeto trabalha gerenciamento de estado, persistência de dados, regras de negócio simples e comunicação entre diferentes páginas utilizando dados armazenados no navegador.

## Autor

**Lucas Petrasso Gouveia**

Front-End Developer
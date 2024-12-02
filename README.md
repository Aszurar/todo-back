# #02 - Node

## Fundamentos de Node.js

- Esse projeto foi feito a partir do 1º desafio do curso de Formação Node.js da Rocketseat.

<div align="center">

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/pt) [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)](https://insomnia.rest/)
</div>

<div align="center">
        <h2>
          <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
          <a href="#dizzy-funcionalidades">Funcionalidades</a>&nbsp;|&nbsp;
          <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
          <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
          <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;
        </h2>
</div>

---

<div align="center" >


**[Vídeo no Youtube]()**

</div>

---

## :information_source: Sobre

- Esse é o 1º desafio do curso Formação Node.js da Rocketseat, onde devemos criar uma API de gerenciamento de tarefas, onde podemos criar, atualizar, deletar uma tarefa e listar todas tarefas e listar com query params.
- A ideia dele é praticar os conceitos iniciais de Node.js, API Rest, métodos HTTP, Rotas, Middlewares, entre outros em uma aplicação Node pura, onde simulamos uma API.
- Assim, começamos a ver conceitos sobre como podemos manipular dados, receber, enviar e escrever dados no Node que seriam com Streams, e no fim criamos um projeto que simula uma API Rest de forma pura no Node sem o uso de frameworks, usando o módulo http, streams e operações assíncronas.
  
---

## :dizzy: Funcionalidades

  1. Criamos um servidor HTTP com o módulo http do Node;
  2. Criamos um arquivo dedicado para definição de rotas, que chamará os métodos de manipulação do "banco de dados" e retornará as respostas, teremos:
     1. **```GET - /task```** => Listagem de todas tarefas e possibilidade de listagem filtrando pelo **title** e/ou **description**
     2. **```POST - /task```** => Criação de uma nova tarefa enviando **title** e **description** no corpo da requisição, e adicionando os campos **```id```**, **```created_at```**, **```updated_at```** e **```completed_at```**
     3. **```PUT - /task/:id```** => Atualização de uma tarefa, enviando **title** e/ou **description** no corpo da requisição, e atualizando os campos **```updated_at```** e **```completed_at```**
     4. **```DELETE - /tasks/:id```** => Deleção de uma tarefa pelo **```id```**
     5. **```PATCH - /tasks/:id/complete```** => Atualizar se uma tarefa está completa ou não adicionando uma data no campo **```completed_at```**.
  3. Criamos um arquivo dedicado para manipulação do "banco de dados", que é uma classe que simula um banco de dados com um array de objetos;
     1. Além disso, nela criamos, os métodos que modificam os dados, como adicionar, atualizar, deletar e listar;
     2. Essas manipulações são feitas de forma assíncrona, simulamos o banco de dados, em um arquivo json, e assim, persistimos essas mudanças nele.
  4. Criamos funções utilitárias que auxiliam na identificação dos Route e Query Params, em conjunto com regex conseguimos extrair esses dados das rotas para realizar as requisições.
  5. Criamos uma função que funciona como um middleware, onde é executada sobre toda requisição e tem o papel de formatar os dados recebidos de Stream para JSON.
  6. Além disso, por meio da lib csv-parser, conseguimos ler um arquivo csv por meio de uma Stream, e usando fetch conseguimos fazer requisições para a API e salvar seus dados no banco de dados.

---

## :seedling: Requisitos Mínimos

  1. NodeJS

---

## :rocket: Tecnologias Utilizadas

- O projeto foi desenvolvido utilizando as seguintes tecnologias:

  1. **[csv-parser](https://github.com/mafintosh/csv-parser)**
  2. **[node](https://nodejs.org/pt)**
  3. **[TypeScript](https://www.typescriptlang.org/)**

---

## :package: Como baixar e executar o projeto

### Baixar

- Clonar o projeto:

  ```bash
   git clone https://github.com/Aszurar/todo-back
  ```

- É necessário ter o Node.js instalado na máquina.
  - [Instalação do NodeJS](https://nodejs.org/en/)

### Execução

- Caso tudo tenha sido instalado com sucesso, basta executar na raiz do projeto:

  ```bash
    pnpm dev
  ```

- Após isso, basta realizar requisições de acordo com as rotas definidas no arquivo `src/routes.js` utilizando o **[Insomnia](https://insomnia.rest/)**, **[Postman](https://www.postman.com/)** ou via terminal com **[httpie](https://httpie.io/)**

<div align="center">

Desenvolvido por :star2: Lucas de Lima Martins de Souza.

</div>

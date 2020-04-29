<img alt="GoStack" src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80">

<h3 align="center">
  :moneybag: GoFinance Backend Challenge
</h3>

<p align="center">
  <a href="#introduction">Introduction</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#functionalities">Functionalities</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#setting-it-up">Setting it up</a>

</p>

## :zero: Introduction

This project is part of a series of challenges of the [Rocketseat Bootcamp](https://rocketseat.com.br/gostack) :rocket:. The software here present is the backend of an application called GoFinance, build to help it's users to have a better control of their expenses. The application allows it's users to input their incomes, outcomes, slit them by categories and returns to the user the total balance.

This material briefly describes it's functionalities, the used technologies and how to set it up to run locally.

## Functionalities

The GoFinance API allows it's users to use the following routes:

- **`POST /transactions`** Create a new transaction by sending the `title`, `value`, `category` and `type`, which must be either `income` or `outcome`.

- **`GET /transactions`** Get the saved transactions and the total balance, incomes and outcomes values.

- **`DELETE /transactions/:id`** Delete a specific transaction by sending it's ID as query parameter.

- **`POST /transactions/import`** Import a series of transactions through a CSV file. The body format must be a form-data, whose key value is named file.

## :computer: Technologies

This application was developed using Typescript and NodeJS, using the following frameworks dependencies and DB:

- [ExpressJS](expressjs.com) - Backend framework used to handle requests and responses
- [TypeORM](https://typeorm.io/#/) - ORM used to manipulate the database
- [Docker](https://www.docker.com/) - Used to run the DB application
- [PostgreSQL](https://www.postgresql.org/) - Database used to store the users informations
- [Multer](https://github.com/expressjs/multer) - Middleware implemented to handle the csv files importation
- [Jest](https://jestjs.io/) - Testing framework to verify the correct functioning of the backend
- [ESLint](https://eslint.org/) - Pluggable lint tool, configured to be AirBnb based
- [Prettier](https://prettier.io/) - Code formatter following the desired patterns

The software architecture was developed following the SOLID principles, using the concepts of services, models and repositories.

## ⚙️ Setting it up

**Step 0**

If you don't have nodejs, git and docker installed in your machine, follow these links ([nodejs](https://nodejs.org/en/download/), [git](https://git-scm.com/downloads) and [docker](https://docs.docker.com/docker-for-windows/install/)) before proceeding

1. **Clone project**

Clone the project to your machine using the command:

```sh
$ git clone {clone-link}
```

2. **Download dependencies**

Access the main folder of the project and execute the command:

```sh
$ npm install
```

3. **Docker run**

Execute the command below to run a postgre container on docker:

```sh
$ docker run --name gofinancedb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

4. **Change database name**

Access the file index.ts under ***src/database*** and switch 'gostack_desafio06_tests' to "postgres". This will run the project on your default database on postgre.

5. **Run migrations**

In order to execute the project, is necessary first to create the tables and relations on the database. For doing it, execute the command below. It will run an typeorm script and apply the migrations configurations found at ***src/database/migrations*** :

```sh
$ npm typeorm migration:run
```

6. **Finally running the project in development mode**

For doing it, just execute the command below, it will run the script found at ***package.json***:

```sh
$ npm dev:server
```

The api will be listening on port 3333.






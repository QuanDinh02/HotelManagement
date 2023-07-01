# Hotel Management

## Description:
My project is about a hotel management website.

## Technologies I use:
- React(JS), Redux.
- NodeJS (ExpressJS, GraphQL).
- Postgres.

## How to Use:
### Note: 
- Node version: 18.12.0.
- Testing Website: Google Chrome.
- Prerequisites:
1. Install 'yarn' before install 2 folder below.
2. Install postgres database.

### Client:
- cd to client folder => type command: '**yarn install**' to install packages.
- type command: '**yarn start**' to run.
- find staff account in database to login.

### Server:
- create a database name: '**hotel_management**' in postgres database.
- config username: "postgres", password in file **config.json** in **config** folder as same as your database configuration.
- cd to server folder => type command: '**yarn install**' to install packages.
- type command: '**yarn sequelize-cli db:migrate**' to generate table in db, '**yarn sequelize-cli db:seed:all**' to generate sample table data.
- type command: '**yarn start**' to run.


## Table of Contents
- [The Website](#the-website)
- [Properties](#properties)
- [Run Server](#run-server)
- [Client Setup](#client-setup)


## The Website 
![Demo](assets/Demo.gif)

## Properties

### URL, Username, and Password
- `spring.application.name=WaiyatCaloriesCounter`
- `spring.datasource.url=jdbc:postgresql://localhost:####/your_db_name`
- `spring.datasource.username=your_username`
- `spring.datasource.password=your_password`

## Spring Database Configuration
- `spring.jpa.show-sql=true`
- `spring.jpa.properties.hibernate.format_sql=true`
- `spring.datasource.driverClassName=org.postgresql.Driver`
- `spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect`
- `spring.jpa.hibernate.ddl-auto=update`
> Other modes for `ddl-auto`: `create`, `validate`, `update`, `create-drop`

## Run Server
Then you can start the Java server by running `WaiyatSocialMediaApplication.java`.

## Client Setup
To start your React application in Visual Studio Code using the bash terminal:

1. First, run `npm install` after pulling the project.
2. Install React Router DOM: `npm install react-router-dom`
3. Install Axios: `npm install axios`

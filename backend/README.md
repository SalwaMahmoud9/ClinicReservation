# Clinic Reservation Backend Project

## Required Technologies
Your application must make use of the following:
### Dependencies:
- npm i bcrypt@5.0.1
- npm i body-parser@1.19.0
- npm i cross-env@5.2.1
- npm i db-migrate@1.0.0-beta.18
- npm i db-migrate-pg@1.2.2
- npm i express@4.18.1
- npm i jsonwebtoken@8.5.1
- npm i jwt-decode@3.1.2
- npm i pg@8.7.3
- npm i supertest@6.2.4
- npm i dotenv@15.0.1
### DEV Dependencies:
- npm i --save-dev @types/bcrypt@5.0.0
- npm i --save-dev @types/dotenv@8.2.0
- npm i --save-dev @types/express@4.17.13
- npm i --save-dev @types/jasmine@3.6.3
- npm i --save-dev @types/jsonwebtoken@8.5.8
- npm i --save-dev @types/node@18.0.6
- npm i --save-dev @types/pg@8.6.5
- npm i --save-dev @types/supertest@2.0.12
- npm i --save-dev @typescript-eslint/eslint-plugin@5.30.7
- npm i --save-dev @typescript-eslint/parser@5.30.7
- npm i --save-dev eslint@7.12.1
- npm i --save-dev eslint-config-prettier@6.15.0
- npm i --save-dev eslint-plugin-prettier@3.4.1
- npm i --save-dev jasmine@3.6.4
- npm i --save-dev jasmine-spec-reporter@7.0.0
- npm i --save-dev jasmine-ts@0.3.0
- npm i --save-dev nodemon@2.0.19
- npm i --save-dev prettier@2.7.1
- npm i --save-dev ts-node@10.9.1
- npm i --save-dev tsc-watch@5.0.3
- npm i --save-dev typescript@4.7.4
### Scripts:
- "start": "nodemon src/server.ts",
- "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
- "test": "set NODE_ENV=test&& npm run build  && npm run testdb-up && jasmine-ts && npm run testdb-reset",
- "tsc": "tsc",
- "build": "npx tsc",
- "lint": "eslint . --ext .ts",
- "prettier": "prettier --config .prettierrc.json src/**/*.ts --write",
- "jasmine": "jasmine",
- "devdb-up": "db-migrate up --config ./database.json --e dev",
- "devdb-reset": "db-migrate reset --config ./database.json --e dev",
- "testdb-up": "db-migrate --config ./database.json --e test up",
- "testdb-reset": "db-migrate reset --config ./database.json --e test"

## Steps :
### 1. Create Database:
**database Port** : 5432;
In psql run the following:
**for Development**
- CREATE DATABASE clinicreservation_dev;
- \c clinicReservation_dev

**for Test**
- CREATE DATABASE clinicreservation_test;
- \c clinicReservation_test

### 2. Migrations:
After run dependencies run some scripts to start :
- npm install -g yarn
**for applying yarn work as npm run**
- npm install -g db-migrate
**for migrations**
***create migrations***
- db-migrate create users --sql-file
- db-migrate create patients --sql-file
- db-migrate create doctors --sql-file
- db-migrate create clinics --sql-file
- db-migrate create appointments --sql-file
***write up migrations***
- users :
    CREATE TYPE user_type AS ENUM ('doctor', 'reception');
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    type user_type NOT NULL,
    password VARCHAR(255) NOT NULL
    );
- patients:
    CREATE TABLE IF NOT EXISTS patients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    gender VARCHAR(10),
    birthdate Date,
    address VARCHAR(255),
    description VARCHAR(255)
    );
- doctors:
    CREATE TABLE IF NOT EXISTS doctors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    gender VARCHAR(10),
    birthdate Date,
    address VARCHAR(255),
    degree VARCHAR(255),
    specialization VARCHAR(255),
    description VARCHAR(255)
    );
- clinics:
    CREATE TABLE IF NOT EXISTS clinics(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255)
    ); 
- appointments:
    CREATE TABLE IF NOT EXISTS appointments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    doctor_id INTEGER REFERENCES doctors(id) NOT NULL,
    patient_id INTEGER REFERENCES patients(id) NOT NULL,
    clinic_id INTEGER REFERENCES clinics(id) NOT NULL,
    date Date NOT NULL,   
    description VARCHAR(255),
    diagnosis VARCHAR(255)
    );
***write down migrations***
- users :
   DROP Table IF EXISTS users;
   DROP TYPE user_type;
- patients :
    DROP Table IF EXISTS patients;
- doctors :
    DROP Table IF EXISTS doctors;
- clinics :
    DROP Table IF EXISTS clinics;
- appointments :
    DROP Table IF EXISTS appointments;

### 2.  Run Migrations

**run up migrations**
**dev**
- npm run devdb-up
**test**
- npm run testdb-up
**run down migrations**
**dev**
- npm run devdb-reset
**test**
- npm run testdb-reset

### 3. Models
add src/models:
- appointment.ts
- clinic.ts
- user.ts 
- patient.ts
- doctor.ts

### 4. Express Handlers
#### users.ts
  **get all users**  
   - GET [/users]
  **get all users by id**
  - GET[/users/:id]
  **create new user**
  - POST[/users]=> create
  **update user by id**
  - PUT[/users/:id]
  **delete user by id**
  - Delete[/users/:id]
  **authenticate user**
  - POST[/users/:username]
#### appointments.ts 
  **get all appointments**
  - GET[/appointments]
  **get product by id**
  - GET[/appointments/:id]
  **insert product**
  -POST[/appointments]
  **update product by id**
  - PUT[/appointments/:id]
  **delete product by id**
  - DElETE[/appointments/:id]
  **get all appointments by filter**
  - GET[/appointmentsFilter/:doctor_id/:patient_id/:clinic_id/:date] 

#### clinics.ts 
  **get all clinics**
  - GET[/clinics] 
  **get clinics by id**
  - GET[/clinics/:id]
  **create new order**
  - POST[/clinics]
   **update order by id**
  - PUT[/clinics/:id]
  **delete order by id**
  - DELETE[/clinics/:id]

#### doctors.ts 
  **get all doctors**
  - GET[/doctors] 
  **get doctors by id**
  - GET[/doctors/:id]
  **create new order**
  - POST[/doctors]
   **update order by id**
  - PUT[/doctors/:id]
  **delete order by id**
  - DELETE[/doctors/:id]  

#### patients.ts 
  **get all patients**
  - GET[/patients] 
  **get patients by id**
  - GET[/patients/:id]
  **create new order**
  - POST[/patients]
   **update order by id**
  - PUT[/patients/:id]
  **delete order by id**
  - DELETE[/patients/:id]  

### 5. steps after start :

(npm run start)=> to start 

create user first by:
  POST[/users]
example add in body json data:
    {
"username": "admin",
"type": "doctor/reception",
"password": "admin"
}
return json data for new user
authorize user to get token to use it:
example: POST[/users/admin]
add in body json data:{
  "password": "admin"  
}
this  will return token
get the token and then put it in header [Authorization] ='brear tokenReturned'
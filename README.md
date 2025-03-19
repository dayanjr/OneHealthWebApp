# OneHealthWebApp
One Heatlh Web Application

# Project set up
navigate to the client directory and run the following command to install the dependencies
```
npm install
```
to the same with the server directory

# Running the project

To run the project, navigate to the client directory and run the following command
```
npm run dev
```

To run the server with nodemon, navigate to the server directory and run the following command
```
npm run dev
```

To run the server with node, navigate to the server directory and run the following command
```
npm start
```

## Docker set up 

Run the following command to build the docker images and run the containers. There's a 
container for the client, server and postgres database. 
```
docker compose up --build
```

I couldn't get volumes to work for the server and client containers. So, you'll need to rebuild the images if you make changes to the server or client code.

To stop the containers, run the following command
```
docker compose down
```
You'll need to create .env file in the root directory and in the server directory to specify the following environment variables to interact with the database. 
```
POSTGRES_USER = ${USERNAME}
POSTGRES_PASSWORD = ${PASSWORD}

```

In the server directory, along with variables meantioned above, you need to define the following environment variables: 

```
DEV_PORT = 4004
```

If you want to use a different port, you'll have to change which port you're exposing in your docker file along with the port mapping argument in the docker-compose.yaml file. 


# SQL DUMP File

The sql dump file is located in the root directory of the project. You can use it to populate the database with some data. To do this, you'll need to run the following docker commands in the root directory of the project.

```bash
psql -U username -h localhost -d database_name < oneHealthDump.sql
```

You can test the database connection by running the following command in the root directory of the project.

```bash
psql -U username -h localhost database_name
```
***NOTE***: Windows users need to first connect to the docker container before they can test database connection. _Make sure your docker containers are running!!_

```bash
docker exec -it docker-image-name bash
```
In our case, the database is being hosted on _one-health-db-1_. After connecting to our docker container we can now connect to the postgres db.

```bash
psql -U username
```
You can then run queries to check if the data was populated correctly.

For the host, you can use localhost or the name of the POSTGRESQL container. 

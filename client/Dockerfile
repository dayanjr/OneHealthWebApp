FROM node:20.13.1-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"] 
#  The client Dockerfile is similar to the server Dockerfile, but with a few key differences. The client Dockerfile uses the  npm run dev  command to start the client application. The client application runs on port 5173, so we expose that port in the Dockerfile. 
#  Step 4: Create a Docker Compose File 
#  The Docker Compose file is a YAML file that defines the services, networks, and volumes for the application. 
#  Create a new file named  docker-compose.yml  in the root directory of the project and add the following code:å
FROM node:20-alpine

# Instalăm docker-cli pentru o potențială configurare Sandbox
RUN apk add --no-cache docker-cli

WORKDIR /usr/src/app

# Copiere definiții pachete și instalare dependențe
COPY package*.json ./
RUN npm install

# Copiere cod sursă
COPY . .

EXPOSE 3000

# Vom rula direct index.js
CMD ["node", "index.js"]

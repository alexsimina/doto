# Etapa 1: Build cu Vite
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Construim aplicația statică
RUN npm run build

# Etapa 2: Servire statică folosind NGINX
FROM nginx:alpine

# Copiem fișierele obținute în etapa de build în folderul specific NGINX
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

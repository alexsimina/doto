# Pornirea Ecosistemului Doto cu Docker Compose

Proiectul conține configurația necesară pentru a rula local folosind `docker-compose`. Arhitectura constă în:
1. **db**: O instanță PostgreSQL 15 bazată pe Alpine.
2. **backend**: Aplicația Node.js, expusă pe portul 3000. Imaginea conține și executabilul `docker-cli` pentru un potențial sandbox viitor.
3. **frontend**: Aplicația de dashboard (Vite), build-uită și servită via NGINX pe portul 8080.

## Comenzi

Pentru a porni întreg ecosistemul:
```bash
docker-compose up --build
```
Dacă vrei să ruleze în fundal (detached mode):
```bash
docker-compose up --build -d
```
Pentru a opri ecosistemul:
```bash
docker-compose down
```

## Accesare
- **Frontend Dashboard**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Baza de date**: Poate fi accesată extern pe portul `5432` cu user-ul `admin` și parola `password123`.

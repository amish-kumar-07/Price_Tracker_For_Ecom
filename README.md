## Architecture Diagram


![Explain](https://github.com/user-attachments/assets/837d42ae-6898-485f-9141-c7011e570ba0)

## Sample Output
![WhatsApp Image 2025-06-20 at 13 19 13_9f26ff85](https://github.com/user-attachments/assets/a17ff089-28d8-41c5-9511-abe2e0666858)

## Dependent
1. Redis
2. Scrapper Api
3. Bull Mq
4. DB
5. Nodemailer
6. Docker
7. Vercel Cron

## Getting Started

1. First, Git Clone:

```bash
git clone https://github.com/amish-kumar-07/Price_Tracker_For_Ecom
```
2. Then Install Dependecies:

```bash
npm run dev
```
3. Configure Env:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER="your email"
SMTP_PASS="your password"
SMTP_SECURE=true
SMTP_FROM=alerts@yourdomain.com  # optional override

DATABASE_URL=""
BASE_URL=http://localhost:3000
API_KEY="Scrapper Api"
REDIS_URL=redis://localhost:6379
```
5. Install Redis using Docker
```bash
docker pull redis:latest
```
6. Run Redis using Docker 

```bash
docker run -itd -p 6379:6379 redis
```
7. Run Your Project
```bash
npm run dev
```

## Querey
Contact : rashusingh110@gmail.com

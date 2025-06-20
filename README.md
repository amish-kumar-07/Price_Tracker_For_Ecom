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

## Env
```
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
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

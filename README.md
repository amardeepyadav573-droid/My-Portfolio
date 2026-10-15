# Amardeep Yadav - Portfolio (React + Vite)

## Run locally
```
npm install
npm start
```

## Contact form setup (messages -> your email)
The form uses [Web3Forms](https://web3forms.com) (free, no backend needed).

1. Go to https://web3forms.com, enter your email and get the **Access Key** (it arrives by mail).
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=your-key`.
3. On Vercel: Project -> Settings -> Environment Variables -> add `VITE_WEB3FORMS_KEY`, then redeploy.

Every submission is delivered to that email. Reply-To is set to the visitor's address, so you can just hit Reply.
Your email address is never exposed in the website code.

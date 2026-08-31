# DMCAR

Site da DMCAR Veiculos Multimarcas, desenvolvido com React, TanStack Start,
Vite e Supabase e preparado para deploy na Vercel.

## Development

Use Node.js e npm para executar o projeto localmente.

```sh
git clone https://github.com/danieldiniz1999/dmcar.git
cd dmcar
npm install
npm run dev
```

## Deploy na Vercel

Importe este repositorio na Vercel e selecione o preset **TanStack Start**.
O build usa `npm run build` e Nitro gera automaticamente a saida para a Vercel.

Configure as seguintes variaveis em Production, Preview e Development:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

As variaveis com prefixo `VITE_` sao publicas no navegador. Nunca use o valor da
service role em uma variavel `VITE_*`.

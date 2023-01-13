# What is this?

Sample code to get data from [Cloudflare D1](https://developers.cloudflare.com/d1/) in [Remix](https://remix.run/docs).

## Motivation

To access Cloudflare D1, we need to write SQL. However, we would be even happier if we could retrieve data as easily as the O/R mapper.
So I am trying to build a query with [kysely](https://github.com/koskimas/kysely) to get the type at the same time.

If you look at [test.tsx](./app/routes/test.tsx), you will see that the data to be retrieved from D1 is typed.

## Development

```sh
$ docker compose up --build
#=> open http://localhost:3000/test
```

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.

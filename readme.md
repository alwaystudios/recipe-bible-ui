# Recipe Bible UI (version 2)

## setup

requires a `.env` file (see .env.template)

```
AUTH0_DOMAIN=<ask me>
AUTH0_CLIENTID=<ask me>
AUTH0_CALLBACK=http://localhost:3001/auth
BASE_URL=http://localhost:3001
API_BASE_URL=http://localhost:21111
AWS_S3_BUCKET=http://localhost:4566/recipe-bible-content
```

run with the `recipe-bible-api` see [recipe bible api](https://github.com/alwaystudios/recipe-bible-api) or set `API_BASE_URL` and `AWS_S3_BUCKET` to point to AWS API gateway (some actions require admin role in auth0)

### Run the site with webpack dev server (runs on port 3001)

```bash
nvm use

yarn

yarn dev
```

## deployed versions in AWS (s3)

[Staging environment](http://recipe-bible.s3-website-eu-west-1.amazonaws.com/)

## Auth0 configuration

https://dev-27x9tbv3.eu.auth0.com/.well-known/jwks.json

### Allowed Callback URLs

```
http://localhost:3001/, https://recipebible.net/
```

### Allowed Logout URLs

```
http://localhost:3001/, https://recipebible.net/
```

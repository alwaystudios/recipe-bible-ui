# Recipe Bible UI (version 2)

## setup

requires a `.env` file with

```
AUTH0_DOMAIN=<ask me>
AUTH0_CLIENTID=<ask me>
AUTH0_CALLBACK=http://localhost:3000/auth
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:21111
AWS_S3_BUCKET=http://localhost:4566/recipe-bible-content
```

run with the `recipe-bible-api` see [recipe bible api](https://github.com/alwaystudios/recipe-bible-api) or set API env var to point to AWS

### Run the site with webpack dev server (runs on port 3000)

```bash
yarn

yarn dev
```

## deployed versions in AWS (s3)

[Staging environment](http://recipe-bible.s3-website-eu-west-1.amazonaws.com/)

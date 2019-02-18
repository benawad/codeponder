

# Code Ponder

### A Marketplace for Code Reviews

A project that I'm live coding daily on [Twitch](https://www.twitch.tv/benawad).

## Contributing

Anyone is welcome to contribute code or designs. Here's a walkthrough on how to add components to the ui package: https://youtu.be/WDk5O-yaoCQ 

You can view the current figma mockup [here](https://www.figma.com/proto/hM2nbxqxBH4k8cpE3JEL3q/code-ponder-collaboration) and you can ask for edit permissions in this issue:   https://github.com/benawad/codeponder/issues/2 

## Important links

- [YouTube Recordings](https://www.youtube.com/playlist?list=PLN3n1USn4xlkeX3ngnRS1G01SEfQGgHWr)
- [spec](https://github.com/benawad/codeponder/issues/1)

## Packages

- server
  - GraphQL server built with Node.js, Typescript, [Type-GraphQL](https://19majkel94.github.io/type-graphql/), Redis, and PostgreSQL
- web
  - Next.js React website using Typescript
- ui
  - React Component library using Storybook
- common
  - shared Typescript code between server and web
  
  # Installing

1. Clone and install dependecies
```
git clone https://github.com/benawad/codeponder.git
cd codeponder
yarn
```
2. Make sure you have PostgreSQL running on your computer with a database called `codeponder2` and a user who has access to that database with the username `postgres` and password `postgres`
* Mac: https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
* Windows: https://www.guru99.com/download-install-postgresql.html
* Docker: https://www.youtube.com/watch?v=G3gnMSyX-XM
* Linux: you know what your doing
* How to create a user: https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e

3. Make sure you have Redis running on your computer
* Mac: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298
* Windows: https://redislabs.com/blog/redis-on-windows-10/
* Linux: you know what your doing

4. Build the common and ui package by running the following command in the root directory
```
yarn build:deps
```

5. Setup Github client id and secret by going to https://github.com/settings/applications/new
* you can set `Application name` to anything you want
* `Homepage URL` can be https://github.com/benawad/codeponder
* `Authorization callback URL` should be http://localhost:4000/oauth/github

5. Create a `.env` file in `packages/server` and fill in your client id and secret
```
GITHUB_CLIENT_ID=<YOUR_CLIENT_ID_HERE>
GITHUB_CLIENT_SECRET=<YOUR_CLIENT_SECRET_HERE>
DB_USER=postgres
DB_PASS=postgres
SESSION_SECRET=asjdfkljaklsfs
```

6. While in the `server` package you can start the server with
```
yarn start
```
To verified it worked, you can go to http://localhost:4000

7. While in the `web` package you can start the website with 
```
yarn dev
```
The website should be available at http://localhost:3000 now

8. I would recommend running
```
yarn watch
```
In the `ui` package so it rebuilds it whenever you make changes.



If you need any help setting this up feel free to message me on Discord: https://discord.gg/Vehs99V


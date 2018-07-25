# Trenity Core

- ./client - contains client side code.
- ./server - contains server side code.

## Installation

1.  Clone.
2.  cd to the base directory.
3.  `npm run` - to get a list of all supported commands.
4.  `npm run setup` - to install server/client dependencies
5.  `npm run server` - to start server.
6.  `npm run client` - to start client.
7.  `npm run dev` - to start both client & server concurrently.

## Deployment

1.  Build frontend first by running `npm run build-client`.
2.  Setup ENV variables in server.
3.  Only have to run server since client will be bundled in client/build.

## Misc Info

Frontend - port 3000,
Backend - port 5000

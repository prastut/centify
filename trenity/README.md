# Trenity Core

- ./client - contains client side code.
- ./server - contains server side code.

## Installation

1.  Install yarn for your OS.
2.  Clone.
3.  cd to the base directory.
4.  `npm run` - to get a list of all supported commands.
5.  `yarn setup` - to install server/client dependencies
6.  `yarn server` - to start server.
7.  `yarn client` - to start client.
8.  `yarn dev` - to start both client & server concurrently.

## Deployment

1.  Build frontend first by running `yarn build-client`.
2.  Setup ENV variables in server.
3.  Only have to run server since client will be bundled in client/build.

## Misc Info

Frontend - port 3000,
Backend - port 5000

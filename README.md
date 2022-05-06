# Matchmaker Bot API

The REST API for [matchmakerbot.gg](https://matchmakerbot.gg), that allows users to edit their channels and view the leaderboards.

## Contents
- [Enviroment Variables](#enviroment_variables)
- [Development](#development)
- [Deployment](#deployment)
- [Authors](#authors)

## Enviroment_Variables

The following environment variabled are required to run the container:
- **MONGO_HOST**: MongoDB host
- **MONGO_USERNAME**: MongoDB username.
- **MONGO_PASSWORD**: MongoDB password.
- **COOKIES_TOKEN**: Token used to generate cookies.
- **CLIENT_ID**: Discord Client Id.
- **CLIENT_SECRET**: Discord Client Secret.
- **HOSTNAME**: Host Name.

## Development

Local development requires the following software:
- NodeJS
- Yarn
- MongoDB

The environment variables mentioned in the [Enviroment Variables](#enviroment_variables) section can be placed in a .env file in the project's root.

If everything is set up correctly, run the following command for an optimal development environment, which will watch for changes in the typescript files and auto-restart the server if necessary.
- `yarn start:watch`

For Deployment, the correct command is:
- `yarn start:prod`

Linting can be run using the following commands:
- `yarn lint`

For any additional commands, check out the package.json.

## Deployment

I use GitHub Actions CI/CD and Kubernetes for my deployments. All required into regarding deployments can be found in /.github and /chart.

## Authors

- **David Pinto** *(iTweeno)*

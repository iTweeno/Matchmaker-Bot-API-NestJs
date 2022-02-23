FROM node:16-alpine AS appbuild
WORKDIR /app
COPY . .
RUN yarn --dev
RUN yarn build

FROM node:16-alpine
WORKDIR /app
COPY --from=appbuild ./app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn --production --frozen-lockfile --ignore-scripts
EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]

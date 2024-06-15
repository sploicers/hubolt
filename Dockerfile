FROM node:22-alpine AS buildtime-image
WORKDIR /build
COPY package.json yarn.lock .
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

FROM node:22-alpine AS runtime-image
WORKDIR /app
COPY --from=buildtime-image /build/package.json .
COPY --from=buildtime-image /build/yarn.lock .
COPY --from=buildtime-image /build/dist ./dist
RUN yarn --frozen-lockfile --production && rm package.json yarn.lock ./dist/**/*.js.map
ENTRYPOINT ["node", "dist/main.js"]
ARG BASE_IMAGE_PREFIX="docker.adeo.no:5000/pus/"
FROM ${BASE_IMAGE_PREFIX}node as builder

ENV CI=true
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json craco.config.js src public ./
RUN npm run build

FROM ${BASE_IMAGE_PREFIX}nginx
COPY --from=builder /source/build /usr/share/nginx/html/veilarbvedtaksstottefs

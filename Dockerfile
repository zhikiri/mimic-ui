FROM node:11.10

WORKDIR app

COPY package*.json /app/
RUN npm ci
COPY . .

RUN npm run lint \
  && npm run build

FROM nginx:1.17-alpine

COPY ./nginx.conf /etc/nginx/
COPY --from=0 /app/dist/mimic-ui /usr/share/nginx/html

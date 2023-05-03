# dev stage
FROM node:19-alpine as dev

ENV NODE_ENV development

ARG REACT_APP_BASE_API
ENV REACT_APP_BASE_API $REACT_APP_BASE_API

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "start"]



FROM dev AS build

RUN npm run build




FROM nginx:1.21.3-alpine AS prod

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

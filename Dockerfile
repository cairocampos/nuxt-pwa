FROM node:22-alpine AS build

WORKDIR /app
COPY ./package*.json ./

RUN npm install
COPY ./ .
RUN npm run generate
# RUN pwd
# RUN ls
# RUN rm -rf /app/.output/public/_nuxt
# RUN mv /app/.output/public/_nuxt_obfuscated	  /app/.output/public/_nuxt	 

FROM nginx:stable-alpine AS nginx

COPY --from=build /app/.output/public /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
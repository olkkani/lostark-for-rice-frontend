# 빌드 스테이지
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY front_nginx.conf /etc/nginx/conf.d/front_nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
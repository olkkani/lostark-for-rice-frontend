# 빌드 스테이지
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173

# 프로덕션 스테이지
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
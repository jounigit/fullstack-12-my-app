# -------- Build stage --------
FROM node:26-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_API_URL=http://localhost:8080/api/
# ENV VITE_API_URL=http://localhost:3001/api/
# ARG VITE_API_URL=http://localhost:8080/api/
# ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# -------- Run stage --------
FROM nginx:1.29-alpine AS final

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


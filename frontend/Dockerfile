# Build + run static Vite frontend
# Produces assets that reference VITE_API_URL via Vite build-time substitution.

# -------- Build stage --------
FROM node:26-alpine AS build
WORKDIR /usr/src/app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Vite reads VITE_* at build time. Provide a default so build doesn't fail.
# Override at build time: docker build --build-arg VITE_API_URL=http://backend:4000
ARG VITE_API_URL=http://localhost:8080/api/
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# -------- Run stage --------
FROM nginx:1.29-alpine AS final

# Serve built app
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Optional: add SPA fallback
# (If you already have an nginx config, replace this accordingly.)
# RUN printf '%s\n' \
#   'server { ' \
#   '  listen 80; ' \
#   '  server_name _; ' \
#   '  root /usr/share/nginx/html; ' \
#   '  index index.html; ' \
#   '  location / { ' \
#   '    try_files $uri $uri/ /index.html; ' \
#   '  } ' \
#   '}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


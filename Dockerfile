FROM node:18-alpine AS telegram-app

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
ENV ORIGIN=http://localhost:3000
USER node:node
CMD ["node","build/index.js"]
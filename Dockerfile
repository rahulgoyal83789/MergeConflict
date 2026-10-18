# Build the Frontend

FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY ./Frontend .

RUN npm install
RUN npm run build

# Build the Backend

FROM node:20-alpine

WORKDIR /app
COPY ./Backend .

RUN npm install

# Copy built frontend into backend's public folder
COPY --from=frontend-builder /app/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]
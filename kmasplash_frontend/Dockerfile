# # Stage 1: Build the React app
# FROM node:16 as build

# WORKDIR /app

# COPY . .

# RUN npm install && npm run build

# Stage 2: Serve the built React app
FROM node:16-alpine

EXPOSE 3000

WORKDIR /app

COPY ./build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]

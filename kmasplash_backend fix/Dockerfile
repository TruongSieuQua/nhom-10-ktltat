# Build stage
FROM node:16-alpine AS build

WORKDIR /usr/src/app

# Set the NODE_OPTIONS environment variable to increase max-old-space-size

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Production stage
FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3060

CMD ["node", "dist/main.js"]

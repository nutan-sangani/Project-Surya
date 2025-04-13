# FROM node:alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# EXPOSE 3000

# COPY . .

# CMD [ "npm","start"]
# Build stage

FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]

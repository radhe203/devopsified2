# Stage 1
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
WORKDIR /app/server
RUN npm run build

# Stage 2
FROM node:20-alpine

WORKDIR /client
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/ ./

EXPOSE 5000

CMD ["npm", "start"]
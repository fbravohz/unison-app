FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci


FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . /app
RUN npm run build


FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080
CMD ["npm","start"]
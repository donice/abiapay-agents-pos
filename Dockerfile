# stage 1 - common
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

# stage 2.1 - builder-min
FROM base AS builder-min
RUN npm install -g husky && \
    NODE_ENV=production npm install --omit=dev

# stage 2 .2- builder
FROM base AS builder
RUN npm install &&\
    NODE_OPTIONS=--max_old_space_size=4096 npm run build

# prod target
FROM node:20-alpine AS production
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder-min --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]

# dev target
FROM base AS dev
ENV NODE_ENV=development
RUN npm install 
CMD ["npm", "run dev"]

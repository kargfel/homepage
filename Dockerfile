FROM node:22.20.0 AS builder

RUN mkdir -p /workspace/app && chown node:node /workspace -R

USER node:node

WORKDIR /workspace/app

# Pre cache packages
COPY --chown=node:node . /workspace/app

RUN npm install && npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built assets from builder stage
COPY --from=builder /workspace/app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

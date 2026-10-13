# Smart Service Desk — frontend image (Phase 0 placeholder).
# Production serving will be finalized in Phase 8.
FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

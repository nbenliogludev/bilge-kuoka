## BUILD STAGE
FROM node:alpine as build

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN NODE_ENV=development pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm build

## UP NGINX STAGE
FROM nginx:alpine

# Copy build output to NGINX's html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

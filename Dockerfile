# build stage: not needed for static (but keep for future if you add tooling)
FROM nginx:stable-alpine
LABEL maintainer="Murali Sai Valiboyina"

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy site
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

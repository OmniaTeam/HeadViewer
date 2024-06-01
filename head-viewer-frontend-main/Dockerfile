# Use a lightweight Nginx image as the final base image
FROM nginx:alpine

# Copy the built app from the build stage to the NGINX HTML directory
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

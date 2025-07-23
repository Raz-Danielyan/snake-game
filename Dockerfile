FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Add our config
COPY nginx.conf /etc/nginx/conf.d

# Add game files
COPY public/ /usr/share/nginx/html
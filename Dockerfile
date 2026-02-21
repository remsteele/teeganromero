FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js
COPY 36DE65B3-7820-4C8B-AF88-DDCAB478EDE4_1_106_c.jpeg /usr/share/nginx/html/36DE65B3-7820-4C8B-AF88-DDCAB478EDE4_1_106_c.jpeg

FROM node
ARG API_URL
ENV API_URL=${API_URL}
WORKDIR /app
RUN mkdir /app/src
ADD src /app/src/
ADD package.json app.js server.js webpack.config.js /app/
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]

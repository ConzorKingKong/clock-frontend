FROM node:10.5
EXPOSE 3000
WORKDIR /app
ADD package.json app.js server.js webpack.config.js /app/
RUN yarn
RUN mkdir /app/src
ARG API_URL
ENV API_URL=$API_URL
ADD src /app/src/
RUN npm run build
RUN rm -rf node_modules webpack.config.js src
RUN npm install --production
RUN rm package-lock.json
ENV API_URL=a
CMD ["npm", "start"]

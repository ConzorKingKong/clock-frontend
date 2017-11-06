FROM node
WORKDIR /app
ADD package.json app.js controllers.js server.js public /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

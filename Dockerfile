FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discordbot
WORKDIR /usr/src/discordbot

COPY package.json /usr/src/discordbot
RUN npm install

COPY . /usr/src/discordbot

EXPOSE 8080
EXPOSE 6379
EXPOSE 8001

# Start the bot.
CMD ["node", "index.js"]
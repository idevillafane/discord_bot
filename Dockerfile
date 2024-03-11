FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/discordbot
WORKDIR /usr/src/discordbot

COPY package.json /usr/src/discordbot
RUN npm install

COPY . /usr/src/discordbot

# Start the bot.
CMD ["node", "index.js"]
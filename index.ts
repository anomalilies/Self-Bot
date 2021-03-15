require("dotenv").config();

const Discord = require("discord.js-self");
const client = new Discord.Client();

import map from "./data/map.json";

client.once("ready", () => {
  console.log("Ready!");

  const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async function loopThroughMembers() {
    for (var i = 0; i < map.length; i++) {
      await client.channels
        .fetch("747201864889794721")
        .then(async (channel: any) => await channel.send(`-fs ${map[i]}`));
      await timeout(8000);
    }
  }
  loopThroughMembers();
});

client.login(process.env.CLIENT_TOKEN);

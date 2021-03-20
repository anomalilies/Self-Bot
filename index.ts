require("dotenv").config();

const Discord = require("discord.js-self");
const client = new Discord.Client();

import map from "./data/map.json";

client.once("ready", () => {
  const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const filter = (m: { author: { id: string; }; }) => m.author.id === "500385855072894982";

  async function loopThroughMembers() {
    const channel = await client.channels.fetch("747201864889794721");

    for (var i = 0; i < map.length; i++) {
      await channel.send(`-fs ${map[i]}`);

      channel.awaitMessages(filter, { max: 1 }).then((m: any) => {
        m.forEach((message: any) => {
          var desc = message.embeds[0].description.replace(
            /([^\d\n]+)|([^\n].*$)/g,
            ""
          );
          var fields = message.embeds[0].fields[0].value
            .match(/(?<=\w*:\s\*\*)(.*?)(?=\*)/g)
            .join("\n");
  
          var info = `${desc.toString()}${fields.toString()}`;
          console.log(`${map[i]}\n${info}`);
        })
      });

      await timeout(8000);
    }
  }
  loopThroughMembers();
});

client.login(process.env.CLIENT_TOKEN);

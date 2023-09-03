import {Client, GatewayIntentBits, SlashCommandBuilder} from "discord.js";
import registerCommands from "./commands";
import registerEvents from "./events";

const initialize = async (token: string) => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
        ]
    });

    registerEvents(client);

    await client.login(token);

    const data = new SlashCommandBuilder().setName('hui').setNameLocalizations({
        ru: 'собственн'
    }).setDescription('guesswhat').setDescriptionLocalizations({
        ru: 'угадай'
    });

    // client.guilds.cache.each(x=>{
    //     x.commands.set([data]);
    // })

    registerCommands(client);
};

export default {initialize};

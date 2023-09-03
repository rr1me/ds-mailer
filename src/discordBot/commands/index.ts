import mailing from "./mailing";
import {ApplicationCommandDataResolvable, ChatInputCommandInteraction, Client, SlashCommandBuilder,} from "discord.js";
import testCommand from "./test";
import sendToRole from "./sendToRole";
import sendToChannel from "./sendToChannel";

type Commands = 'mailing' | 'test' | 'sendtorole' | 'sendtochannel' // only lowercase

export type Command = (i: ChatInputCommandInteraction) => Promise<void>;

// export const commandsToExecute = {
//     'mailing': {
//         exec: mailing,
//         description: 'Mailing command',
//         nameLocalizations: {
//             ru: 'рассылка'
//         }
//     },
//     'test': {
//         exec: testCommand,
//         description: 'Test shot',
//         nameLocalizations: {
//             ru: 'отправитьроли'
//         }
//     },
//     'sendtorole': {
//         exec: sendToRole,
//         description: 'Sending message to users with that role',
//         nameLocalizations: {
//             ru: 'отправитьроли'
//         }
//         // options: [
//         //     {
//         //         name: 'role',
//         //         description: 'Role to send a message',
//         //         required: true,
//         //         type: 8
//         //     }
//         // ]
//     },
//     'sendtochannel': {
//         exec: sendToChannel,
//         description: 'Sending message to all users in that message channel'
//     }
// } as CommandsToExecute;

// export const commandsToRegister = Object.entries(commandsToExecute).map((v) => ({
//     ...v[1],
//     name: v[0]
// }));


type CommandsToExecute = {
    builder: SlashCommandBuilder,
    exec: Command
};

const commandsToExecute = [
    {
        builder: new SlashCommandBuilder().setName('mailing').setDescription('Mailing command')
            .setNameLocalization('ru', 'рассылка').setDescriptionLocalization('ru', 'Команда для рассылки'),
        exec: mailing
    },
    {
        builder: new SlashCommandBuilder().setName('sendtorole').setDescription('Sending message to users with that role')
            .setNameLocalization('ru', 'отправитьроли').setDescriptionLocalization('ru', 'Отправить сообщение юзерам с выбранной ролью')
            .addRoleOption(x=>
                x.setName('role').setNameLocalization('ru', 'роль')
                    .setDescription('Role to send a message').setDescriptionLocalization('ru', 'Роль, которой нужно отправить сообщение')
                    .setRequired(true)
            ),
        exec: sendToRole
    },
    {
        builder: new SlashCommandBuilder().setName('sendtochannel').setDescription('Sending message to all users in that message channel')
            .setNameLocalization('ru', 'отправитьканалу').setDescriptionLocalization('ru', 'Отправить сообщение всем юзерам в этом текстовом канале'),
        exec: sendToChannel
    }
] as CommandsToExecute[];

const registerCommands = (client: Client) => client.guilds.cache.each(g => g.commands.set(commandsToExecute.map(x=>x.builder)));

export default registerCommands;

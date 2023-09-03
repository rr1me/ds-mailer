import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {Command} from "./commands";
import {Event} from "./events";

export type BotInternalMemory = { x: ChatInputCommandInteraction[] };

export const InternalMemoryProcessor = (object: BotInternalMemory) => {
    const add = (i: ChatInputCommandInteraction) => object.x.push(i);
    const get = (id: string) => object.x.find(x => x.user.id === id);
    const remove = (id: string) => object.x = object.x.filter(x => x.user.id !== id);

    return {
        add,
        get,
        remove
    };
};

export const classicInteraction = (name: string, title: string, storage: BotInternalMemory): Command => {
    const {
        add,
        get
    } = InternalMemoryProcessor(storage);

    return async i => {
        const userId = i.user.id;

        if (get(userId)) {
            await i.reply({
                "content": `**You already started ${name} process!**\nClick on \`Cancel ${name}\` button in previous message to cancel process.`,
                "ephemeral": true
            });

            return;
        }

        add(i);

        const cancelButton = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cancel' + name)
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Cancel ' + name),
            );

        await i.reply({
            "embeds": [
                {
                    "title": title,
                    "color": 0x39AECF
                }
            ],
            "ephemeral": true,
            "components": [cancelButton]
        });
    };
};

export const classicCancelButton = (name: string, storage: BotInternalMemory): Event<ButtonInteraction> => {
    const {remove} = InternalMemoryProcessor(storage);

    return async i => {
        remove(i.user.id);
        await i.reply({
            "content": name + " action has been canceled",
            "ephemeral": true
        });
    };
};

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

export const classicInteraction = (interactionType: InteractionType, storage: BotInternalMemory): Command => {
    const {
        add,
        get
    } = InternalMemoryProcessor(storage);

    return async i => {
        const {title, alreadyStartedTitle, buttonLabel} = getLocalization(interactionType, i.locale);

        const userId = i.user.id;

        if (get(userId)) {
            await i.reply({
                "content": alreadyStartedTitle,
                "ephemeral": true,
            });

            return;
        }

        add(i);

        const cancelButton = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(interactionType)
                    .setStyle(ButtonStyle.Danger)
                    .setLabel(buttonLabel),
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

const getLocalization = (interactionType: InteractionType, actualLocale: string) => {
    const locale = actualLocale === 'ru' ? actualLocale : 'en';
    return localizations[interactionType][locale];
}

export const classicCancelButton = (interactionType: InteractionType, storage: BotInternalMemory): Event<ButtonInteraction> => {
    const {remove} = InternalMemoryProcessor(storage);

    return async i => {
        const {buttonReply} = getLocalization(interactionType, i.locale);

        remove(i.user.id);
        await i.editReply({
            "content": buttonReply
        });
    };
};

export type InteractionType = 'mailing' | 'sendToRole' | 'sendToChannel';

const localizations = {
    mailing: {
        en: {
            title: 'Send message you want to get by every user in server',
            alreadyStartedTitle: '**You already started mailing process!**\nClick on `Cancel mailing` button in previous message to cancel process.',
            buttonLabel: 'Cancel mailing',
            buttonReply: 'Mailing has been canceled'
        },
        ru: {
            title: 'Отправьте сообщение, которое должен получить каждый юзер сервера',
            alreadyStartedTitle: '**Вы уже начали процесс рассылки!**\nНажмите на кнопку `Отменить рассылку` в предыдущем сообщении для отмены.',
            buttonLabel: 'Отменить рассылку',
            buttonReply: 'Рассылка отменена'
        }
    },
    sendToRole: {
        en: {
            title: 'Send message you want to get by every user with role you mentioned',
            alreadyStartedTitle: '**You already started role mailing process!**\nClick on `Cancel role mailing` button in previous message to cancel process.',
            buttonLabel: 'Cancel role mailing',
            buttonReply: 'Role mailing has been canceled'
        },
        ru: {
            title: 'Отправьте сообщение, которое должен получить каждый юзер с отмеченной вами ролью',
            alreadyStartedTitle: '**Вы уже начали процесс рассылки ролям!**\nНажмите на кнопку `Отменить рассылку ролям` в предыдущем сообщении для отмены.',
            buttonLabel: 'Отменить рассылку ролям',
            buttonReply: 'Рассылка ролям отменена'
        }
    },
    sendToChannel: {
        en: {
            title: 'Send message you want to get by every user in this message channel',
            alreadyStartedTitle: '**You already started channel mailing process!**\nClick on `Cancel channel mailing` button in previous message to cancel process.',
            buttonLabel: 'Cancel channel mailing',
            buttonReply: 'Channel mailing has been canceled'
        },
        ru: {
            title: 'Отправьте сообщение, которое должен получить каждый юзер в этом текстовом канале',
            alreadyStartedTitle: '**Вы уже начали процесс рассылки всем юзерам в текстовом канале!**\nНажмите на кнопку `Отменить рассылку в текстовом канале` в предыдущем сообщении для отмены.',
            buttonLabel: 'Отменить рассылку в текстовом канале',
            buttonReply: 'Рассылка в текстовом канале отменена'
        }
    }
} as {
    [key in InteractionType]: {
        en: Localization,
        ru: Localization
    }
};

type Localization = {
    title: string,
    alreadyStartedTitle: string,
    buttonLabel: string,
    buttonReply: string
}

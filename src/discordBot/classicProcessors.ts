import {getLocalization, ClassicInteraction} from "./localization";
import {Event} from "./events";
import {BotInternalMemory, InternalMemoryProcessor} from "./utils";
import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";

export const classicInteraction = () => {
    // const {
    //     add,
    //     get
    // } = InternalMemoryProcessor(storage);

    return async (i: ChatInputCommandInteraction) => {
        // const {
        //     title,
        //     alreadyStartedTitle,
        //     buttonLabel
        // } = getLocalization(interactionType, i.locale);
        //
        // const userId = i.user.id;
        //
        // if (get(userId)) {
        //     await i.reply({
        //         "content": alreadyStartedTitle,
        //         "ephemeral": true,
        //     });
        //
        //     return;
        // }
        //
        // add(i);
        //
        // const cancelButton = new ActionRowBuilder<ButtonBuilder>()
        //     .addComponents(
        //         new ButtonBuilder()
        //             .setCustomId(interactionType)
        //             .setStyle(ButtonStyle.Danger)
        //             .setLabel(buttonLabel),
        //     );
        //
        // await i.reply({
        //     "embeds": [
        //         {
        //             "title": title,
        //             "color": 0x39AECF
        //         }
        //     ],
        //     "ephemeral": true,
        //     "components": [cancelButton]
        // });
    };
};

export const classicCancelButton = (interactionType: ClassicInteraction, storage: BotInternalMemory): Event<ButtonInteraction> => {
    const {remove} = InternalMemoryProcessor(storage);

    return async i => {
        const {buttonReply} = getLocalization(interactionType, i.locale);

        remove(i.user.id);
        await i.editReply({
            "content": buttonReply
        });
    };
};

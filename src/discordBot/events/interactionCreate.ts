import {Event} from "./index";
import {commandsToExecute} from "../commands";
import {Interaction} from "discord.js";
import buttonsToExecute from "../buttons";

const interactionCreate: Event<Interaction> = async i => {
    if (i.isChatInputCommand()) {
        const cmd = i.commandName;
        await commandsToExecute[cmd as keyof typeof commandsToExecute].exec(i);
        return;
    }

    if (i.isButton()) {
        const btn = i.customId;
        await buttonsToExecute[btn as keyof typeof buttonsToExecute](i);
    }
};

export default interactionCreate;

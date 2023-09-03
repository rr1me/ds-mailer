import {ButtonStyle} from "discord.js";
import {BotInternalMemory, classicInteraction} from "../utils";

export const usedMailing: BotInternalMemory = {x: []};

const mailing = classicInteraction('Mailing', 'Send message you need to send', usedMailing);

export default mailing;

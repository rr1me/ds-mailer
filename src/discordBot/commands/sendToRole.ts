import {ButtonStyle} from "discord.js";
import {BotInternalMemory, classicInteraction} from "../utils";

export const usedSendToRole: BotInternalMemory = {x: []};

const sendToRole = classicInteraction('SendToRole', 'Send message you need to send to role you mentioned', usedSendToRole);

export default sendToRole;

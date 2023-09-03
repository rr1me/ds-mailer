import {BotInternalMemory, classicInteraction} from "../utils";

export const usedSendToRole: BotInternalMemory = {x: []};

const sendToRole = classicInteraction('sendToRole', usedSendToRole);

export default sendToRole;

import {BotInternalMemory, classicInteraction} from "../utils";

export const usedSendToChannel: BotInternalMemory = {x: []};

const sendToChannel = classicInteraction('sendToChannel', usedSendToChannel);

export default sendToChannel

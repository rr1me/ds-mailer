import {BotInternalMemory} from "../internalMemoryProcessor";
import {classicInteraction} from "../classicProcessors";

export const usedSendToChannel: BotInternalMemory = {x: []};

const sendToChannel = classicInteraction('sendToChannel', usedSendToChannel);

export default sendToChannel;

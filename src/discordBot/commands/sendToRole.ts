import {BotInternalMemory} from "../internalMemoryProcessor";
import {classicInteraction} from "../classicProcessors";

export const usedSendToRole: BotInternalMemory = {x: []};

const sendToRole = classicInteraction('sendToRole', usedSendToRole);

export default sendToRole;

import {BotInternalMemory} from "../utils";
import {classicInteraction} from "../classicProcessors";

export const usedSendToChannel: BotInternalMemory = {x: []};

const sendToChannel = classicInteraction();

export default sendToChannel;

import {classicInteraction} from "../classicProcessors";
import {BotInternalMemory} from "../utils";

export const usedSendToRole: BotInternalMemory = {x: []};

const sendToRole = classicInteraction();

export default sendToRole;

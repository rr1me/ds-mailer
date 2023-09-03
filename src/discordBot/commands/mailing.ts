import {BotInternalMemory} from "../utils";
import {classicInteraction} from "../classicProcessors";

export const usedMailing: BotInternalMemory = {x: []};

const mailing = classicInteraction();

export default mailing;

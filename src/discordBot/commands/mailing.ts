import {BotInternalMemory, classicInteraction} from "../utils";

export const usedMailing: BotInternalMemory = {x: []};

const mailing = classicInteraction('mailing', usedMailing);

export default mailing;

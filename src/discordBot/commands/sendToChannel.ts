import {BotInternalMemory, classicInteraction} from "../utils";

export const usedSendToChannel: BotInternalMemory = {x: []};

const sendToChannel = classicInteraction('SendToChannel', 'Send message you want to send to all users in that message channel', usedSendToChannel);

export default sendToChannel

import {ButtonInteraction} from "discord.js";
import {classicCancelButton, InteractionType} from "../utils";
import {usedMailing} from "../commands/mailing";
import {usedSendToRole} from "../commands/sendToRole";
import {usedSendToChannel} from "../commands/sendToChannel";

type Button = (i: ButtonInteraction) => Promise<void>;

type ButtonsToExecute = {
    [key in InteractionType]: Button;
}

const buttonsToExecute = {
    'mailing': classicCancelButton('mailing', usedMailing),
    'sendToRole': classicCancelButton('sendToRole', usedSendToRole),
    'sendToChannel': classicCancelButton('sendToChannel', usedSendToChannel),
} as ButtonsToExecute;

export default buttonsToExecute;

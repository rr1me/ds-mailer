import {ButtonInteraction} from "discord.js";
import {usedMailing} from "../commands/mailing";
import {usedSendToRole} from "../commands/sendToRole";
import {usedSendToChannel} from "../commands/sendToChannel";
import {ClassicInteractionType} from "../classicLocalizations";
import {classicCancelButton} from "../classicProcessors";

type Button = (i: ButtonInteraction) => Promise<void>;

type ButtonsToExecute = {
    [key in ClassicInteractionType]: Button;
}

const buttonsToExecute = {
    'mailing': classicCancelButton('mailing', usedMailing),
    'sendToRole': classicCancelButton('sendToRole', usedSendToRole),
    'sendToChannel': classicCancelButton('sendToChannel', usedSendToChannel),
} as ButtonsToExecute;

export default buttonsToExecute;

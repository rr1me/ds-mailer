import {ButtonInteraction} from "discord.js";
import {classicCancelButton} from "../utils";
import {usedMailing} from "../commands/mailing";
import {usedSendToRole} from "../commands/sendToRole";
import {usedSendToChannel} from "../commands/sendToChannel";

type Buttons = 'cancelMailing' | 'cancelSendToRole'

type Button = (i: ButtonInteraction) => Promise<void>;

type ButtonsToExecute = {
    [key in Buttons]: Button;
}

const buttonsToExecute = {
    'cancelMailing': classicCancelButton('Mailing', usedMailing),
    'cancelSendToRole': classicCancelButton('SendToRole', usedSendToRole),
    'cancelSendToChannel': classicCancelButton('SendToChannel', usedSendToChannel),
} as ButtonsToExecute;

export default buttonsToExecute;

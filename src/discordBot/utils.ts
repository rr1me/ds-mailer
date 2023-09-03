import {ChatInputCommandInteraction} from "discord.js";
import {usedMailing} from "./commands/mailing";
import {usedSendToChannel} from "./commands/sendToChannel";
import {usedSendToRole} from "./commands/sendToRole";

const ImpEqualPredicate = (id: string) => (x: ChatInputCommandInteraction)=>x.user.id === id;

export type BotInternalMemory = { x: ChatInputCommandInteraction[] };

export const InternalMemoryProcessor = (object: BotInternalMemory) => {
    const add = (i: ChatInputCommandInteraction) => object.x.push(i);
    const get = (id: string) => object.x.find(ImpEqualPredicate(id));
    const remove = (id: string) => object.x = object.x.filter(x => x.user.id !== id);

    return {
        add,
        get,
        remove
    };
};

export const checkActivatedCommands = (id: string) =>
    !!usedMailing.x.find(ImpEqualPredicate(id)) || !!usedSendToRole.x.find(ImpEqualPredicate(id)) || !!usedSendToChannel.x.find(ImpEqualPredicate(id));

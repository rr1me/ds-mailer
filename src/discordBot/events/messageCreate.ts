import {Event} from "./index";
import {Message, PermissionsBitField} from "discord.js";
import {InternalMemoryProcessor} from "../utils";
import {usedMailing} from "../commands/mailing";
import {usedSendToRole} from "../commands/sendToRole";
import {usedSendToChannel} from "../commands/sendToChannel";

const messageCreate: Event<Message> = async m => {
    const userId = m.author.id;

    const {
        get: getUsedMailing,
        remove: removeUsedMailing
    } = InternalMemoryProcessor(usedMailing);
    const mailingInteraction = getUsedMailing(userId);
    if (mailingInteraction) {
        (await m.guild!.members.fetch()).each(member => {
            if (member.user.bot) return;
            member.user.send({
                content: m.content,
                files: m.attachments.map(x => x.url)
            });
        });

        removeUsedMailing(userId);

        await m.delete();
        await mailingInteraction.deleteReply();

        return;
    }

    const {
        get: getSendToRole,
        remove: removeUsedSendToRole
    } = InternalMemoryProcessor(usedSendToRole);
    const sendToRoleInteraction = getSendToRole(userId);
    if (sendToRoleInteraction) {
        const roleId = sendToRoleInteraction.options.getRole('role')!.id;

        (await m.guild!.roles.fetch()).find(x => x.id === roleId)?.members.each(member => {
            if (member.user.bot) return;
            member.user.send({
                content: m.content,
                files: m.attachments.map(x => x.url)
            });
        });

        removeUsedSendToRole(userId);

        await m.delete();
        await sendToRoleInteraction.deleteReply();

        return;
    }

    const {
        get: getSendToChannel,
        remove: removeUsedSendToChannel
    } = InternalMemoryProcessor(usedSendToChannel);
    const sendToChannelInteraction = getSendToChannel(userId);
    if (sendToChannelInteraction) {
        const members = (await m.guild!.members.fetch()).filter(x => !x.user.bot && x.permissionsIn(m.channel.id).has(PermissionsBitField.Flags.ViewChannel));

        members.each(x => x.send({
            content: m.content,
            files: m.attachments.map(x => x.url)
        }));

        removeUsedSendToChannel(userId);

        await m.delete();
        await sendToChannelInteraction.deleteReply();
    }
};

export default messageCreate;

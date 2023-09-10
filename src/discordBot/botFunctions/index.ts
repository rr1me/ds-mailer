import {Attachment, AttachmentBuilder, Collection, Guild, GuildMember} from "discord.js";

type Attachments = Attachment[] | AttachmentBuilder[] | string[];
export const mail = async (guild: Guild, content: string, attachments: Attachments) => { // mail function
    (await guild.members.fetch()).each(member => {
        if (member.user.bot) return;
        member.user.send({
            content: content,
            files: attachments
        });
    });
};

export const toRole = async (guild: Guild, content: string, attachments: Attachments, roleId: string) => { // send to role function
    (await guild.roles.fetch()).find(x => x.id === roleId)?.members.each(member => {
        if (member.user.bot) return;
        member.user.send({
            content: content,
            files: attachments
        });
    });
};

export const toChannel = async (guild: Guild, content: string, attachments: Attachments, members: Collection<string, GuildMember>) => { // send to channel function
    members.each(x => x.send({
        content: content,
        files: attachments
    }));
};

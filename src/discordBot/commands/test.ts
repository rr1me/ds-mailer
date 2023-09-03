import {Command} from "./index";

const testCommand: Command = async i => {
    await i.reply({ content: 'test', ephemeral: true  });
};

export default testCommand

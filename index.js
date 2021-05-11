const {
    Plugin
} = require('powercord/entities');

module.exports = class ROT13 extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'encrot',
            description: 'Zaszyfruj tekst szyfrem ROT13',
            usage: '{c} <text>',
            executor: (args) => ({
                send: false,
                username: "Feris Plugins.",
                avatar_url: "https://cdn.discordapp.com/avatars/769507561568337930/9543d915819b1c718475444a3166998c.png?size=128",
                result: rot13(args.join(' '))
            })
        });

        powercord.api.commands.registerCommand({
            command: 'sencrot',
            description: 'Zaszyfruj tekst i wyślij.',
            usage: '{c} <text>',
            executor: (args) => ({
                send: true,
                result: rot13(args.join(' ')),
            })
        });

        powercord.api.commands.registerCommand({
            command: 'decrot',
            description: 'Odszyfruj tekst zaszyfrowany szyfrem ROT13',
            usage: '{c} <ROT13 string>',
            executor: function (args) {
                let result;
                try {
                    result = rot13(args.join(' '));
                } catch {
                    result = 'Niepoprawna wartość';
                }

                return {
                    send: false,
                    username: "Feris Plugins.",
                    avatar_url: "https://cdn.discordapp.com/avatars/769507561568337930/9543d915819b1c718475444a3166998c.png?size=128",
                    result: result
                };
            }
        });
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('encrot');
        powercord.api.commands.unregisterCommand('sencrot');
        powercord.api.commands.unregisterCommand('decrot');
    }
};

function rot13(str) {
    var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    var index = x => input.indexOf(x);
    var translate = x => index(x) > -1 ? output[index(x)] : x;
    return str.split('').map(translate).join('');
}
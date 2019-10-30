let rpc = require('./gm/modules/npm/rage-rpc.min.js');
let browser = mp.browsers.new("package://gm/CEF/views/inventory/browser/index.html");
browser.active = false;

let keyPress = false;
mp.keys.bind(9, true, function() {
    keyPress = !keyPress;

    browser.active = keyPress;
    mp.gui.cursor.show(keyPress, keyPress);
    mp.gui.chat.activate(!keyPress);
    mp.gui.chat.push('I key is pressed.');

    rpc.callServer('keypress:i');
});
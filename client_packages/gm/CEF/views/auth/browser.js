let browser = mp.browsers.new("package://gm/CEF/views/auth/form/index.html");
browser.active = false;

let keyPress = false;
mp.keys.bind(0x71, true, function() {
    keyPress = !keyPress;

    browser.active = keyPress;
    mp.gui.cursor.show(keyPress, keyPress);
    mp.gui.chat.activate(!keyPress);

    //mp.events.callRemote('keypress:F2'); // Calling server event "keypress:F2"
    mp.gui.chat.push('F2 key is pressed.');
});
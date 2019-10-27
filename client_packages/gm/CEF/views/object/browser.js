let browser = mp.browsers.new("package://gm/CEF/views/auth/form/index.html");
browser.active = false;

let keyPress = false;
mp.keys.bind(0x72, true, function() {
    keyPress = !keyPress;

    browser.active = keyPress;
    mp.gui.cursor.show(keyPress, keyPress);
    mp.gui.chat.activate(!keyPress);
    mp.gui.chat.push('F3 key is pressed.');
});
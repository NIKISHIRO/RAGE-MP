let browser = mp.browsers.new("package://gm/auth/cef/index.html");
browser.active = false;
mp.gui.cursor.show(false, false);


mp.events.add('CEF_Register', (login, email, password) => {
    mp.gui.chat.push('CEF_Register');
    mp.gui.chat.push(login);
    mp.gui.chat.push(email);
    mp.gui.chat.push(password);

    mp.events.callRemote('CEF_Register', login, email, password);
});

mp.events.add('CEF_Login', (login, password) => {
    mp.gui.chat.push('CEF_Login');
    mp.gui.chat.push(login);
    mp.gui.chat.push(password);

    mp.events.callRemote('CEF_Login', login, password);
});

let keyPress = false;
mp.gui.cursor.show(keyPress, keyPress);

mp.keys.bind(0x71, true, function() {
    keyPress = !keyPress;
    mp.gui.cursor.show(keyPress, keyPress); // Показать курсор и зафризить пока он есть
    browser.active = keyPress; 
    mp.gui.chat.show(!keyPress);

    return mp.gui.chat.push('F2 key is pressed.');
});
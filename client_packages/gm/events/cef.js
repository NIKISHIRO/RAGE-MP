mp.events.add('CEF_Register_c', (login, email, password) => {
    mp.gui.chat.push('CEF_Register_c');
    mp.gui.chat.push(login);
    mp.gui.chat.push(email);
    mp.gui.chat.push(password);

    mp.events.callRemote('CEF_Register_s', login, email, password);
});

mp.events.add('CEF_Login_c', (login, password) => {
    mp.gui.chat.push('CEF_Login_c');
    mp.gui.chat.push(login);
    mp.gui.chat.push(password);

    mp.events.callRemote('CEF_Login_s', login, password);
});

mp.events.add('objectCreator_c', (model, position, rotation, alpha, dimension) => {
    mp.gui.chat.push('objectCreator_c');
    mp.gui.chat.push(model);
    mp.gui.chat.push(position);
    mp.gui.chat.push(rotation);
    mp.gui.chat.push(alpha);
    mp.gui.chat.push(dimension);

    mp.events.callRemote('objectCreator_s', model, position, rotation, alpha, dimension);
});
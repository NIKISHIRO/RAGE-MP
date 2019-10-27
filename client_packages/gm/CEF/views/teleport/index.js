let browser = mp.browsers.new("package://gm/CEF/views/teleport/browser/index.html");
browser.active = false;

let keyPress = browser.active;
mp.keys.bind(0x73, true, function() {
    keyPress = !keyPress;
    mp.events.callRemote('keypress_F4'); // Calling server event "keypress:F2"
    browser.active = keyPress;
    mp.gui.chat.activate(keyPress);
    mp.gui.cursor.visible = keyPress;
    mp.gui.chat.push('F4 key is pressed.');
});

mp.events.add('getPointsClient', (points) => {    
    browser.execute(`getpoints(${points});`);
})

mp.events.add('pointget', (obj) =>{
    mp.gui.chat.push(obj);
    mp.events.callRemote('pointget', obj);
});

mp.events.add('deleteget', (obj) =>{
    mp.events.callRemote('deleteget', obj);
})

mp.events.add('createget', (obj) =>{
    browser.reload(false);
    mp.gui.chat.push(obj);
    mp.events.callRemote('createget', obj);
})

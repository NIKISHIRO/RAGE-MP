class BrowserCEF {
    constructor() {
        this._setup();
    }

    _setup() {
        const self = this;
        self._browser = mp.browsers.new(`package://gm/CEF/views/${url}`);
        self._browserActive = false;
        self._controlFreeze = false;
        self._chatActive = false;
        self._cursorActive = false;
    }

    browser(url) {
        this._browser = mp.browsers.new(`package://gm/CEF/views/${url}`);
    }

    setBrowserActive(bool) {
        this._browserActive = bool;
        this._browser.active = bool;
    }

    setChatActive(bool) {
        this._chatActive = bool; 
        mp.gui.chat.activate(bool);
    }

    setCursorActive(bool) {
        this._cursorActive = bool;
        mp.gui.cursor.visible = bool;
    }

    getBrowserActive() {
        return this._browserActive;
    }

    getChatActive() {
        this._chatActive = bool; 
        mp.gui.chat.activate(bool);
        return this._chatActive;
    }

    getCursorActive() {
        this._cursorActive = bool;
        mp.gui.cursor.visible = bool;
        return this._cursorActive;
    }
}
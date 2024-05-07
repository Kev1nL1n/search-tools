// preload.js
const {ipcRenderer} = require('electron');

window.electronAPI = {
    invoke(data) {
        return ipcRenderer.invoke("invoke", data);
    },
    send(channel, data) {
        // whitelist channels
        let validChannels = ["toMain"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive(channel, func) {
        let validChannels = ["fromMain"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
};

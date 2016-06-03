const {
    BrowserWindow
} = require('electron').remote;
const {
    ipcRenderer
} = require('electron');

// Vue Instances
(function() {
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
        }
    });
    var master = new Vue({
        el: '#master',
        data: {
            input: '',
            showMenu: false,
            mode: false,
            moreButtons: false,
            float: 'flip_to_front',
            colors: ['green', 'red', 'orange'],
            currentColor: 0
        },
        methods: {
            navigationOpen: function() {
                var utilBarTimer;
                if (utilBarTimer) {
                     clearTimeout(utilBarTimer);
                }
                console.log('hoge');
                this.showMenu = true;
                utilBarTimer = setTimeout(function() {
                    this.showMenu = false;
                }, 2000);
            },
            edit: function() {
                this.mode = true;
            },
            view: function() {
                this.mode = false;
            },
            more: function() {
                this.moreButtons = !this.moreButtons;
            },
            openWindow: function() {
                unique_id = BrowserWindow.getFocusedWindow().id;
                ipcRenderer.send('createStickies', unique_id);
            },
            closeWindow: function() {
                if (confirm('Are you sure ?')) {
                    window.close();
                }
            },
            floatWindow: function() {
                focused_window = BrowserWindow.getFocusedWindow();
                unique_id = focused_window.id;
                if (focused_window.isAlwaysOnTop()) {
                    this.float = 'flip_to_front';
                    ipcRenderer.send('flip_to_back', unique_id);
                } else {
                    this.float = 'flip_to_back';
                    ipcRenderer.send('flip_to_front', unique_id);
                }
            },
            opacityWindow: function() {
                unique_id = BrowserWindow.getFocusedWindow().id;
                ipcRenderer.send('opacityWindow', unique_id);
            },
            invertColors: function() {
                this.currentColor = (this.currentColor < this.colors.length - 1) ? this.currentColor + 1 : 0;
            }
        },
        filters: {
            marked: marked
        }
    });
}).call(this);

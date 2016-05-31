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
            input: '## Markdown Stickies\r- Edit here\r- Write your to-do list\r> With Markdown Stickies.  \r> Nice and cool, isn\'t it ?\r\r### Help\r- Check our website: http://\r- Markdown Reference: http://\r\r|app name|ver|by|\r|-|-|-|\r|Markdown Stickies|0.1.0|honake|\r',
            showMenu: false,
            color: 'color1',
            mode: 'view',
            float: 'flip_to_front'
        },
        methods: {
            navigationOpen: function() {
                this.showMenu = true;
                console.log('open')
            },
            navigationClose: function() {
                this.showMenu = false;
                console.log('close')
            },
            Edit: function() {
                document.getElementById("switch_1").style.display = "block";
                document.getElementById("switch_2").style.display = "none";
                this.mode = 'edit';
            },
            View: function() {
                document.getElementById("switch_1").style.display = "none";
                document.getElementById("switch_2").style.display = "block";
                this.mode = 'view';
            },
            OpenWindow: function() {
                unique_id = BrowserWindow.getFocusedWindow().id
                ipcRenderer.send('createStickies', unique_id);
            },
            CloseWindow: function() {
                var confirmation = confirm('Are you sure ?')
                if (confirmation) {
                    window.close()
                }
            },
            FloatWindow: function() {
                focused_window = BrowserWindow.getFocusedWindow()
                unique_id = focused_window.id
                if (focused_window.isAlwaysOnTop()) {
                    this.float = 'flip_to_front'
                    ipcRenderer.send('flip_to_back', unique_id);
                } else {
                    this.float = 'flip_to_back'
                    ipcRenderer.send('flip_to_front', unique_id);
                }
            },
            OpacityWindow: function() {
                unique_id = BrowserWindow.getFocusedWindow().id
                ipcRenderer.send('opacityWindow', unique_id);
            },
            InvertColors: function() {
                switch (this.color) {
                    case 'color1':
                        this.color = 'color2';
                        console.log(this.color);
                        break
                    case 'color2':
                        this.color = 'color3';
                        console.log(this.color);
                        break
                    case 'color3':
                        this.color = 'color1';
                        console.log(this.color);
                        break
                }
            }
        },
        filters: {
            marked: marked
        }
    });
}).call(this);

// Initialization
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
            showMenu: false
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
            },
            View: function() {
                document.getElementById("switch_1").style.display = "none";
                document.getElementById("switch_2").style.display = "block";
            },
            OpenWindow: function() {
                var rand = Math.floor(Math.random() * 31); // Randomization
                var x = window.screenX - 300 - rand;
                var y = window.screenY + rand;
                window.open('another.html', '', 'width=300, height=400, left=' + x + ', top=' + y);
            },
            CloseWindow: function() {
                var confirmation = confirm('Are you sure ?')
                if (confirmation) {
                    window.close()
                }
            }
        },
        filters: {
            marked: marked
        }
    });
}).call(this);

/* Navigation System

function OpacityWindow() {
    console.log('opacity')
}

function FloatWindow() {
    console.log('float')
}

function WrapWindow() {
    memoryX = window.innerWidth
    memoryY = window.innerHeight
    window.resizeTo(200, 100);
}

function UnwrapWindow() {
    window.resizeTo(memoryX, memoryY);
} */

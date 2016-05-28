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
            input: '',
            showMenu: false,
            color: 'color1'
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
            },
            InvertColors: function() {
                switch (this.color) {
                    case 'color1':
                        this.color = 'color2';
                        break
                    case 'color2':
                        this.color = 'color3';
                        break
                    case 'color3':
                        this.color = 'color1';
                        break
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

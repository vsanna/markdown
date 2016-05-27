// Initialization
(function() {
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
        }
    });
    new Vue({
        el: '#master',
        data: {
            showMenu: false,
        },
        methods: {
            navigationOpen: function() {
                this.showMenu = true;
                console.log('open')
            },
            navigationClose: function() {
                this.showMenu = false;
                console.log('close')

            }
        }
    });
    new Vue({
        el: '#editor',
        data: {
            input: ''
        },
        filters: {
            marked: marked
        }
    });
    /*  new Vue({
              el: '#navigation',
              data: {
                  showMenu: false,
              },
              methods: {
                  navigationOpen: function() {
                      this.showMenu = true;
                      console.log('open')
                  },
                  navigationClose: function() {
                      this.showMenu = false;
                      console.log('close')

                  }
              }
          }
      );*/
}).call(this);

// Navigation System

function Display(no) {

    if (no == "no1") {

        document.getElementById("switch_1").style.display = "block";
        document.getElementById("switch_2").style.display = "none";

    } else if (no == "no2") {

        document.getElementById("switch_1").style.display = "none";
        document.getElementById("switch_2").style.display = "block";

    }

}

function OpenWindow() {
    var rand = Math.floor(Math.random() * 31); // Randomization
    var x = window.screenX - 300 - rand;
    var y = window.screenY + rand;
    window.open('another.html', '', 'width=300, height=400, left=' + x + ', top=' + y);
}

function CloseWindow() {
    var confirmation = confirm('Are you sure ?')
    if (confirmation) {
        window.close()
    }
}

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
}

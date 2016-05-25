// Initialization
(function() {
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
        }
    });
    new Vue({
        el: '#editor',
        data: {
            input: '## Markdown Stickies\r- Edit here\r- Write your to-do list\r> With Markdown Stickies.  \r> Nice and cool, isn\'t it ?\r\r### Help\r- Check our website: http://\r- Markdown Reference: http://\r\r|app name|ver|by|\r|-|-|-|\r|Markdown Stickies|0.1.0|honake|\r'
        },
        filters: {
            marked: marked
        }
    })
    new Vue({
        el: '#navigation',
        data: {
            show: false,
            transitionName: 'navigation'
        }
    })
}).call(this);

// Navigation
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
    console.log(x, y)
}

function CloseWindow() {
    var confirmation = confirm('Are you sure ?')
    if (confirmation) {
        window.close()
    }
}

Vue.transition('expand', {
  beforeEnter: function (el) {
    el.textContent = 'beforeEnter'
  },
  enter: function (el) {
    el.textContent = 'enter'
  },
  afterEnter: function (el) {
    el.textContent = 'afterEnter'
  },
  enterCancelled: function (el) {
  },
  beforeLeave: function (el) {
    el.textContent = 'beforeLeave'
  },
  leave: function (el) {
    el.textContent = 'leave'
  },
  afterLeave: function (el) {
    el.textContent = 'afterLeave'
  },
  leaveCancelled: function (el) {
  }
})

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
            /*
             * 以下のメソッドを定義して、htmlのmouseoverにはtoggleだけを設置しましょう。
               toggleNavigation: function(){
                 if ( this.showMenu ){
                   this.navigationClose();
                 } else {
                   this.navigationOpen();
                 }
               }
             * */
            navigationOpen: function() {
                this.showMenu = true;
                console.log('open'); // consoleは消そう。また行末セミコロンは絶対につけよう
            },
            navigationClose: function() {
                this.showMenu = false;
                console.log('close') // 同上
            },
            // 原則命名は趣味嗜好だと思っていますのであくまで一意見ですが、
            // jsはcamelcaseを基本とするので、editがいいのかも. editHogeFuga
            Edit: function() {
                document.getElementById("switch_1").style.display = "block"; 
                document.getElementById("switch_2").style.display = "none";
                // 対象のdomにv-show="hoge"を設置して、ここでthis.hoge = true/falseしたほうがきれい
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
                /* こうもかけます。どちらもOK
                 * if ( confirm('are you sure?') ){
                 *  window.close();
                 * }
                 * */
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
                    case 'color1': // color1, color2という変数名は後でわからなくなるので説明的な変数名がいいです
                        this.color = 'color2';
                        console.log(this.color); // console.logは使ったら消すといいです。ただ個人開発なら最後にまとめて消すでもOKです
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
                /*
                 * ココのロジックを拝見すると、今1だったら2へ、2だったら3へ、3だったら1へ順繰りに変更していくんですよね
                 * であれば、console.log抜きにして9行使うのは少々もったいない(同じ様は記述の繰り返しが見られる)ので、以下のようには出来ないでしょうか。
                 *
                 * まず、dataオブジェクトに以下のように追記
                 *
                 * data: {
                 *   colors: ['green', 'red', 'orange'], // 仮にここでは上記のcolor1, color2, color3に対応するとする
                 *   currentColor: 0, // 初期値は0(this.colors[this.currentColor]と使用する)
                 * }
                 *
                 * 次にInvertColorsのメソッドをリファクタ
                 * invertColors: function(){
                 *   this.currentColor = (this.currentColor < this.colors.length) ? 
                 *                        this.currentColor + 1 : 1 ;
                 * }
                 *
                 * こうすると2行で済みますし、また色を追加するのもthis.colorsの配列に文字列を放り込んでいくだけです。
                 * */
            }
        },
        filters: {
            marked: marked
        }
    });
}).call(this);

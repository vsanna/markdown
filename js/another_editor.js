// highlightの設定
(function() {
    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
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
    })
}).call(this);

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
    // 要素の位置を取得する
    var element = document.getElementById("target");
    var rect = element.getBoundingClientRect();
    // 座標を計算する
    var positionX = rect.left + window.pageXOffset; // 要素のX座標
    var positionY = rect.top + window.pageYOffset; // 要素のY座標
    window.open('another.html', '', 'width=300, height=400, left=positionX, top=positionY');
}

function CloseWindow() {
    var confirmation = confirm('Are you sure ?')
    if (confirmation) {
        window.close()
    }
}

// highlightの設定
(function() {
marked.setOptions({
    highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
    }
});

// el：対象となるHTML要素。ここで指定した要素に対し、dataで指定した値がバインドされる。
// data：バインドする値
// methods：イベントなどから呼び出す各種処理

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

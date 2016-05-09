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
        input: '## Markdown Stickies\r- Edit here\r- Write your to-do list\r> With Markdown Stickies.  \r> Nice and cool, isn\'t it ?\r\r### Help\r- Check our website: http://\r- Markdown Reference: http://\r\r|app name|ver|by|\r|-|-|-|\r|Markdown Stickies|0.1.0|honake|\r'
    },
    filters: {
        marked: marked
    }
})
}).call(this);

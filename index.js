Vue.use(Toasted);
var main = new Vue({
    el: '#input-text',
    data: {
        message: '',
        status: false
    },
    computed: {
        reversedMessage: function () {
            var newMessage = '';
            for (var codePoint of this.message) {
                codePoint = codePoint.charCodeAt(0);
                // A - Z 转换
                if (codePoint >= 65 && codePoint <= 90) {
                    codePoint += 120315;
                    newMessage += String.fromCodePoint(codePoint);
                }
                // a - z 转换
                else if (codePoint >= 97 && codePoint <= 122) {
                    codePoint += 120309;
                    newMessage += String.fromCodePoint(codePoint);
                } else {
                    newMessage += String.fromCodePoint(codePoint);
                }
            }
            return newMessage;
        }
    },
    methods: {
        update: function () {
            if (this.message.length > 0) {
                this.status = true;
            }  else {
                this.status = false;
            }
        }
    }
});

var clipboard = new ClipboardJS('.btn');
// 成功回调
clipboard.on('success', function (e) { 
    Vue.toasted.show('复制成功', {
        position: 'bottom-center',
        duration: 2000
    });
    e.clearSelection();
});
// 失败回调
clipboard.on('error', function (e) {
    Vue.toasted.show('复制失败', {
        position: 'bottom-center',
        duration: 2000
    });
});
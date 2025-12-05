$(function () {
    do_barrager();

    async function do_barrager() {
        const query = new AV.Query('barrager');
        const lists = await query.find(); // 获取弹幕数据
        let index = 0;

        const timer = setInterval(() => {
            if (index >= lists.length) {
                clearInterval(timer);
            } else {
                const obj = lists[index];
                const jsonObject = JSON.parse(JSON.stringify(obj));

                // 往 #commentList 添加一条评论
                $('#commentList').append(`
                    <div class="comment-item">
                        <img src="/medias/barrager/${Math.floor(Math.random() * 3)}.png" alt="头像">
                        <div class="comment-text">
                            <a href="${jsonObject.href}" target="_blank">${jsonObject.info}</a>
                        </div>
                    </div>
                `);

                index++;
            }
        }, 500);
    }
});

// 发送评论
function run() {
    let info = $('input[name=info]').val() || 'hello world';
    let href = $('input[name=href]').val() || 'https://github.com/blinkfox/hexo-theme-matery';
    let speed = parseInt($('input[name=speed]').val());
    if (speed > 20 || speed < 5) speed = Math.floor(Math.random() * 10) + 5;

    const Barrager = AV.Object.extend('barrager');
    const barrager = new Barrager();
    barrager.set('href', href);
    barrager.set('info', info);
    barrager.set('speed', speed);

    barrager.save().then(() => {
        // 添加到列表中
        $('#commentList').append(`
            <div class="comment-item">
                <img src="/medias/barrager/${Math.floor(Math.random() * 3)}.png" alt="头像">
                <div class="comment-text">
                    <a href="${href}" target="_blank">${info}</a>
                </div>
            </div>
        `);

        // 清空输入框
        $('input[name=info]').val('');
        $('input[name=href]').val('');
        $('input[name=speed]').val('');
    });
}

// 清空评论
function clear_barrage() {
    $('#commentList').empty();
}

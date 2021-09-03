(function() {
    if (!Cookies.get('name')) $('.username').text('请登录');
    else {
        $('.username').text('欢迎，' + Cookies.get('name'))
    }

})()



$('.header').on('click', function() {
    layer.confirm(`<h4>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;声明与政策</h4>
    &emsp;&emsp;欢迎您来到小米有品!<br>
    &emsp;&emsp;我们依据最新法律法规要求，制定并更新了《隐私政策》、《小米有品用户协议》以及《小米帐号使用协议》。<br>
    &emsp;&emsp;您需阅读并同意相关政策条款方可进行登录。
`, {
            btn: ['不同意', '同意'],
        },
        function() {
            location.reload();
        },
        function() {
            console.log("???")
            window.location.href = '/login/index.html'
        }
    )
})

$('.line-1').on('click', function() {
    window.location.href = '/myorder/index.html';
})
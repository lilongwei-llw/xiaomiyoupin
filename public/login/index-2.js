var $loginForm = $('form.login').Validform({
    tiptype: 3
});
$('button.btn-login').on('click', function() {
    //表单验证
    if (!$loginForm.check(false)) return;
    let name = $('.name').val().trim();
    let pwd = $('.pwd').val().trim();
    let phone = $('.phone').val().trim();
    console.log(name, pwd, phone);
    //验证用户名
    $.ajax({
            type: 'get',
            url: `/user/check_name/${name}`,
            success: function(res) {
                if (res.code !== 200) {
                    layer.msg(res.msg);
                    console.log(res);
                    return;
                } else {
                    if (res.data !== 0) {
                        layer.msg('用户名已存在')
                        return;
                    }
                }
            }
        })
        // 验证手机号
    $.ajax({
            type: 'get',
            url: `/user/check_phone/${phone}`,
            success: function(res) {
                if (res.code !== 200) {
                    layer.msg(res.msg);
                    console.log(res);
                    return;
                } else {
                    if (res.data !== 0) {
                        layer.msg('手机号已被绑定')
                        return;
                    }
                }
            }
        })
        // 注册

    $.ajax({
        type: 'post',
        url: `/user/register`,
        data: {
            name: name,
            pwd: pwd,
            phone: phone
        },
        success: function(res) {
            if (res.code !== 200) {
                layer.msg(res.msg);
                console.log(res);
                return;
            } else {

                layer.msg('注册成功')
                setTimeout(function() { window.location.href = '/login/index.html' }, 1000)
                return;

            }
        }
    })

})
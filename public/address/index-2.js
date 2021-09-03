var id = parseInt($.query.get('cid')) || 0;
var setTime = 0;
console.log(id);
//如果有id 则是修改地址
if (id !== 0) {
    $('.title').text('修改收货地址')
    $('.delete-address').closest('.line').css('display', 'block');
    $.ajax({
        type: 'get',
        url: `/address/model/${id}`,
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            if (res.code !== 200) { console.log(res); return; } else {
                console.log(res);
                $('.receive-name').val(res.data.receiveName);
                $('.receive-phone').val(res.data.receivePhone);
                $('.receive-region').val(res.data.receiveRegion);
                $('.receive-detail').val(res.data.receiveDetail);
            }
        }
    })

    $('.add-address').on('click', function() {
        $.ajax({
            type: 'post',
            url: '/address/update',
            headers: {
                Authorization: Cookies.get('token')
            },
            data: {
                id: id,
                receiveName: $('.receive-name').val(),
                receivePhone: $('.receive-phone').val(),
                receiveRegion: $('.receive-region').val(),
                receiveDetail: $('.receive-detail').val()

            },
            success: function(res) {
                if (res.code !== 200) { alert(res.msg); return; } else {
                    console.log(res);
                }
                isDefault();
                window.location.href = '/address/index.html'
            }
        });

    })
}
// 新增收货地址
else {

    $('.add-address').on('click', function() {
        $.ajax({
            type: 'post',
            url: '/address/add',
            headers: {
                Authorization: Cookies.get('token')
            },
            data: {

                receiveName: $('.receive-name').val(),
                receivePhone: $('.receive-phone').val(),
                receiveRegion: $('.receive-region').val(),
                receiveDetail: $('.receive-detail').val()

            },
            success: function(res) {
                if (res.code !== 200) { console.log(msg); return; } else {
                    console.log(res);
                }
                isDefault();
                window.location.href = '/address/index.html'
            }
        });

    })
}
// 修改默认地址
function isDefault() {
    console.log("已出发");
    if (document.querySelector('.isdefault').checked == true) {
        $.ajax({
            type: 'get',
            url: `/address/set_default/${id}`,
            headers: {
                Authorization: Cookies.get('token')
            },
            success: function(res) {
                if (res.code !== 200) { alert(res.msg); return; } else {
                    console.log(res);
                    setTime = 1;
                }
            }
        })
    }
}

$('.delete-address').on('click', function() {
    $.ajax({
        type: 'get',
        url: `/address/remove/${id}`,
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            if (res.code !== 200) { console.log(res); return; } else {
                console.log(res);
            }
            window.location.href = '/address/index.html'
        }
    })
})
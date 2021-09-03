// 请求总金额
var orderId = sessionStorage.getItem('orderId');
var price = 0;
$.ajax({
    type: 'get',
    url: `/order/account/${orderId}`,
    headers: {
        Authorization: Cookies.get('token')
    },
    success: function(res) {
        //console.log(res)
        price = res.data;
        $('.price').text(price);
        $('.order-button').text('确认支付￥' + price + '.00');
    }
})


$('.order-button').on('click', function() {
        $.ajax({
            type: 'get',
            url: `/order/pay/${orderId}`,
            headers: {
                Authorization: Cookies.get('token')
            },
            success: function(res) {
                if (res.code !== 200) { console.log(res); return; } else {
                    alert('付款成功');
                }

            }
        })

    })
    //返回所有未付款订单信息
    // $.ajax({
    //     type: 'get',
    //     url: `/order/list_unpay`,
    //     headers: {
    //         Authorization: Cookies.get('token')
    //     },
    //     success: function(res) {
    //         console.log(res)

//     }
// })
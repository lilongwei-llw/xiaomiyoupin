var goods = [];
goods = sessionStorage.getItem('goods').split(',')
console.log(goods);
let total = 0;
// 动态渲染要生成订单的商品列表
var totalprice;
$.ajax({
    type: 'post',
    url: '/cart/list_ids',
    headers: {
        Authorization: Cookies.get('token')
    },
    data: {
        ids: goods
    },
    success: function(res) {
        if (res.code !== 200) { console.log(res); return }
        console.log(res);

        res.data.forEach(function(item, index) {
            total += item.count * item.price;
            let str = `
                    <div class="good" data-id="${item.id}" amount="${item.count}" price="${item.price}">
                    <div class="pic"><img src="${item.avatar}" alt=""></div>
                    <div class="right">
                        <span class="brief">${item.name}${item.brief}</span>
                        <span class="price">
                        <div class="pri">￥${item.price}</div>
                        
                        <div class="amount">X${item.count}</div>
                        
                        </span>

                </div>
                    `;
            document.querySelector('.wrapper-content').innerHTML += str;
        })
        $('.all-price').text(total);
    }

})

// 获取所有收货地址
$.ajax({
    type: 'get',
    url: '/address/list',
    headers: {
        Authorization: Cookies.get('token')
    },
    success: function(res) {
        if (res.code !== 200) { console.log(res); return; } else {
            console.log(res);

        }
    }

})
var alladdress = ''; //所有地址
var defaultId = ''; //默认地址id
var lastId = 0; //最终确定的地址id
// 获取默认地址
$.ajax({
    type: 'get',
    url: '/address/get_default',
    headers: {
        Authorization: Cookies.get('token')
    },
    success: function(res) {
        if (res.code !== 200) { console.log(res); return; } else {
            console.log(res);
            //如果没有默认地址
            if (!res.data) {
                // 获取所有地址

                $.ajax({
                    type: 'get',
                    url: '/address/list',
                    headers: {
                        Authorization: Cookies.get('token')
                    },
                    success: function(res) {
                        if (res.code !== 200) { console.log(res); return; } else {
                            // 如果一个地址都没有 显示添加一个收货地址
                            if (res.data.length == 0) {
                                let str = '<input type="button" class="new-address" value="请先添加一个地址" onclick="addAddress() ">';
                                $('.address').html(str);
                                console.log('没有收货地址')
                            } else {
                                // 有收货地址 显示第一个收货地址
                                console.log(res);
                                lastId = parseInt(res.data[0].id);
                                alladdress = res;
                                let str = `
                <div class="line-1"><span>${res.data[0].receiveName}</span><span class="phone">${res.data[0].receivePhone}</span></div>
                <div class="line-2">${res.data[0].receiveRegion}${res.data[0].receiveDetail}</div>
                `;
                                $('.address').html(str);
                            }

                        }
                    }

                })
            }
            // 如果有默认地址 显示默认地址
            else {
                defaultId = parseInt(res.data.id);
                lastId = parseInt(res.data.id);
                let str = `
                <div class="line-1"><span>${res.data.receiveName}</span><span class="phone">${res.data.receivePhone}</span></div>
                <div class="line-2">${res.data.receiveRegion}${res.data.receiveDetail}</div>
                `;
                $('.address').html(str);
                //获取所有地址
                $.ajax({
                    type: 'get',
                    url: '/address/list',
                    headers: {
                        Authorization: Cookies.get('token')
                    },
                    success: function(res) {
                        alladdress = res;
                    }
                })
            }
            // defaultId = res.data.id;

        }
    }

})

// 点击地址栏修改地址和添加地址
// 通过三目运算是上方显示的地址id前方选框class为yes 其他是no 
$('.address').on('click', changeadd);


function changeadd() {
    $('.address-list-wrapper').toggleClass('display-none');
    $('.footer').toggleClass('display-none');
    var str = "";
    alladdress.data.forEach(function(item, index) {
        str += `
<div class="address-list" data-id=${item.id}>
<div class="checkbox  ${item.id==lastId?'yes':'no'}"></div>
<div class="line-wrapper">
    <div class="add-line-1">
        <span>${item.receiveName}</span>
        <span>${item.receivePhone}</span>
    </div>
    <div class="add-line-2">
        <span>${item.receiveRegion}${item.receiveDetail}</span>
    </div>
</div>
</div>
`;
    })
    $('.aaa').html(str);
    console.log(alladdress);
}

//通过checkbox改变上方地址显示及lastId
function changeLastAdd() {
    console.log($(this));
    if ($(this).hasClass('yes')) return;
    $('.yes').removeClass('yes').addClass('no');
    $(this).addClass('yes').removeClass('no');
    lastId = parseInt($(this).closest('.address-list').attr('data-id'));
    console.log(lastId)
        //发送ajax获取选定地址id的相关信息并改变上方显示
    $.ajax({
        type: 'get',
        url: `/address/model/${lastId}`,
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            console.log(res)
            let str = `
            <div class="line-1"><span>${res.data.receiveName}</span><span class="phone">${res.data.receivePhone}</span></div>
            <div class="line-2">${res.data.receiveRegion}${res.data.receiveDetail}</div>
            `;
            $('.address').html(str);
        }
    })
    $('.address-list-wrapper').toggleClass('display-none');
    $('.footer').toggleClass('display-none');

}
//绑定checkbox事件
$('.address-list-wrapper').on('click', '.checkbox', changeLastAdd);

function addAddress() {
    window.location.href = '/address/index-2.html'
}

// 订单生成页面
$('.order-button').on('click', function() {
    $.ajax({
        type: 'post',
        url: '/order/confirm',
        headers: {
            Authorization: Cookies.get('token')
        },
        data: {
            ids: goods,
            account: total,
            addressId: lastId
        },
        success: function(res) {
            if (res.code !== 200) { console.log(res); return; } else {
                console.log(res);
                sessionStorage.setItem('orderId', res.data);
                //跳转至支付页面
                window.location.href = `/order_pay/index.html`;
            }
        }
    })
})
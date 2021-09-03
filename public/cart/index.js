(function() {
    $.ajax({
        type: 'post',
        url: '/cart/list',
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            if (res.code !== 200) { alert(res.msg); return; } else {
                if (res.data.length == 0) {
                    $('.if-none').css('display', 'flex');
                    $('.edit').text("")
                } else {
                    $('.if-none').css('display', 'none');
                    res.data.forEach(function(item, index) {
                        //console.log(item);
                        let str = `
                        <div class="good" data-id="${item.id}" amount="${item.count}" price="${item.price}">
                        <div class="check-box">	<div class="check-box-box check"></div></div>
                        <div class="pic"><img src="${item.avatar}" alt=""></div>
                        <div class="right">
                            <span class="brief">${item.name}${item.brief}</span>
                            <span class="price">
                            <div class="pri">￥${item.price}</div>
                            <div class="dec">-</div>
                            <div class="amount">${item.count}</div>
                            <div class="inc">+</div></div>
                            </span>

                    </div>
                        `;
                        document.querySelector('.wrapper-content').innerHTML += str;
                    })

                    //$('.cart-list-wrapper').css('display', 'flex')
                    $('.content').css('padding', '0')
                    updateTotal()
                }
            }
        }

    })

})()
//checkbox点击
$('.wrapper-content').on('click', '.check-box-box', function(e) {
        //console.log($(this));
        $(this).toggleClass('no-check');
        $(this).toggleClass('check');
        if ($('.check-box .no-check').length > 0) {
            $('.allcheck-box').addClass('no-check');

        } else {
            $('.allcheck-box').removeClass('no-check');

        }
        updateTotal();
    })
    //allcheckbox 点击
$('.allcheck').on('click', '.allcheck-box', function(e) {
        //console.log('??');
        $(this).toggleClass('no-check');
        if ($(this).hasClass('no-check')) {
            $('.check-box-box').addClass('no-check');
            $('.check-box-box').removeClass('check');
        } else {
            $('.check-box-box').removeClass('no-check');
            $('.check-box-box').addClass('check');
        }
        updateTotal()
    })
    // 数量减少按钮
$('.wrapper-content').on('click', '.dec', function(e) {
        //console.log(e.target.closest('.good'))
        let id = $(e.target.closest('.good')).attr('data-id'); //获取id
        let count = parseInt($(e.target.closest('.good')).attr('amount')); //获取数目
        if (count == 1) {
            return;
        }
        $.ajax({
            type: 'post',
            url: `/cart/decrease/${id}`,
            headers: {
                Authorization: Cookies.get('token')
            },
            success: function(res) {
                if (res.code !== 200) {
                    console.log(res.msg);
                    return;
                } else {
                    console.log("//");
                    count = parseInt(count) - 1;

                    $(e.target.closest('.good')).attr('amount', count);
                    $(e.target).next('.amount').text(count);
                    updateTotal()
                }
            }
        })

    })
    //数量增加按钮

$('.wrapper-content').on('click', '.inc', function(e) {
    //console.log(e.target.closest('.good'))
    let id = $(e.target.closest('.good')).attr('data-id'); //获取id
    let count = parseInt($(e.target.closest('.good')).attr('amount')); //获取数目
    $.ajax({
        type: 'post',
        url: `/cart/increase/${id}`,
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            if (res.code !== 200) {
                console.log(res.msg);
                return;
            } else {
                console.log("//");
                count = parseInt(count) + 1;
                $(e.target.closest('.good')).attr('amount', count);
                $(e.target).prev('.amount').text(count);
                updateTotal()
            }
        }
    })

})

// 计算总价格
function updateTotal() {
    var total = 0;
    $('.check').each(function(index, item) {
        //console.log($(item).closest('.good').attr('price'));
        //console.log($(item).closest('.good').attr('amount'));
        total = total + parseInt($(item).closest('.good').attr('price')) * parseInt($(item).closest('.good').attr('amount'));
    })
    $('.all-price').text('￥' + total);
    return total;
}

// 编辑按钮
$('.edit').on('click', function() {

        if ($(this).hasClass('ok')) {
            $(this).text('编辑');
            $(this).removeClass('ok');
            $('.two').css('display', 'none');
            $('.one').css('display', 'flex');
            $('.check-box-box').removeClass('no-check');
            $('.check-box-box').addClass('check');
            $('.allcheck-box').removeClass('no-check');
            $('.allcheck-box').addClass('check');

        } else {
            $(this).text('完成');
            $(this).addClass('ok');
            $('.one').css('display', 'none');
            $('.two').css('display', 'flex');
            $('.check-box-box').addClass('no-check');
            $('.check-box-box').removeClass('check');
            $('.allcheck-box').addClass('no-check');
            $('.allcheck-box').removeClass('check');
        }
    })
    //删除按钮
$('.clear-button').on('click', function() {
    let ids = [];
    $('.check').each(function(index, item) {
            ids[index] = $(item).closest('.good').attr('data-id');
        })
        //console.log(ids);
    $.ajax({
        type: 'post',
        url: '/cart/remove',
        headers: {
            Authorization: Cookies.get('token')
        },
        data: {
            ids: ids
        },
        success: function(res) {
            if (res.code !== 200) { alert(res.msg); return; } else {
                alert('删除成功');
            }
        }
    });
    $('.check').closest('.good').remove();

})

//结算按钮

$('.order-button').on('click', function() {
    let ids = [];
    var defaultId = 0;
    $('.check').each(function(index, item) {
        ids[index] = parseInt($(item).closest('.good').attr('data-id'));
    })
    console.log(ids);
    sessionStorage.setItem('goods', ids);
    window.location.href = `/order/index.html`;




})
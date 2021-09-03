    // 根据点击发送ajax 返回所有订单信息
    $('.asc').on('click', function() {
        var x = ($(this).attr('data-col'))
        getOrder(x)
    });
    var all = 'list_all';
    //getOrder(all);
    $.ajax({
        type: 'get',
        url: `/order/list_all`,
        headers: {
            Authorization: Cookies.get('token')
        },
        success: function(res) {
            console.log(res);
            let html = '';
            // 遍历订单
            res.data.forEach(function(item, index) {
                // 遍历订单商品
                let goodStr = ""
                item.details.forEach(function(item, index) {
                    goodStr += `
            <div class="good">
                <div class="left"><img src="${item.avatar}" alt="" class="avatar"></div>

                <div class="right">
                    <div class="right-l">
                        <span class="name">${item.name}</span>
                       
                    </div>
                    <div class="right-r">
                        <span class="price">￥${item.price}</span>
                        <span class="price">X${item.count}</span>
                    </div>
                    
                </div>
            </div>
                `;
                })
                html += `
            <div class="order" data-id='${item.orderId}'>
            ${goodStr}
            <div class="order-foot">
            <span class="sale">总金额：${item.account}</span>
            <div class="order-foot-2"> 
            <div class="delete">删除订单</div>
            <div class="${!item.pay?'buy':'hasbuy'}">${!item.pay?'去支付':'已支付'}</div>
            </div>   
            </div>
        </div>
            `;
            })
            $('.list').html(html);

        }
    })

    function getOrder(sort) {
        console.log(`/order/${sort}`);
        let a = sort;
        $.ajax({
            type: 'get',
            url: `/order/${a}`,
            headers: {
                Authorization: Cookies.get('token')
            },
            success: function(res) {
                console.log(res);
                let html = '';
                // 遍历订单
                res.data.forEach(function(item, index) {
                    // 遍历订单商品
                    let goodStr = ""
                    item.details.forEach(function(item, index) {
                        goodStr += `
                <div class="good">
                    <div class="left"><img src="${item.avatar}" alt="" class="avatar"></div>

                    <div class="right">
                        <div class="right-l">
                            <span class="name">${item.name}</span>

                        </div>
                        <div class="right-r">
                            <span class="price">￥${item.price}</span>
                            <span class="price">X${item.count}</span>
                        </div>

                    </div>
                </div>
                    `;
                    })
                    html += `
                <div class="order" data-id='${item.orderId}'>
                ${goodStr}
                <div class="order-foot">
                <span class="sale">总金额：${item.account}</span>
                <div class="order-foot-2"> 
                <div class="delete">删除订单</div>
                <div class="${!item.pay?'buy':'hasbuy'}">${!item.pay?'去支付':'已支付'}</div>
                </div>   
                </div>
            </div>
                `;
                })
                $('.list').html(html);

            }
        })
    }




    // 删除订单
    $('.list').on('click', '.delete', function() {
            console.log($(this).closest('.order').attr('data-id'));
            $.ajax({
                type: 'get',
                url: `/order/remove/${$(this).closest('.order').attr('data-id')}`,
                headers: {
                    Authorization: Cookies.get('token')
                },

                success: function(res) {
                    if (res.code !== 200) { console.log(res); return; } else {
                        console.log(res);

                    }
                }
            })
            $(this).closest('.order').remove();
        })
        // 支付订单
    $('.list').on('click', '.buy', function() {
        sessionStorage.setItem('orderId', $(this).closest('.order').attr('data-id'));
        window.location.href = '/order_pay/index.html';
    })
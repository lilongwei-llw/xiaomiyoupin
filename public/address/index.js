$.ajax({
    type: 'get',
    url: '/address/list',
    headers: {
        Authorization: Cookies.get('token')
    },
    success: function(res) {
        if (res.code !== 200) { alert(res.msg); return; } else {
            if (res.data.length == 0) {
                $('.if-none').css('display', 'flex');
            } else {
                $('.if-none').css('display', 'none');
                console.log(res);
                let str = "";
                res.data.forEach(function(iteam) {
                    console.log(iteam);
                    str += `
                    <div class="address" data-id=${iteam.id}>
                    <div class="left">
                        <div>
                            <span class="name">${iteam.receiveName}</span>
                            <span class="phone">${iteam.receivePhone}</span>
                        </div>
                        <div>
                            <span class="detail">
                            <span class="default ${iteam.isDefault?'xianshi':'buxianshi'}">默认</span>${iteam.receiveRegion}${iteam.receiveDetail}
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/images/icon_edit_gray.png" alt="">
                    </div>
                </div>
                    `;
                    $('.address-wrapper').html(str);
                })
            }
        }
    }
});

$('.add-address').on('click', function() {
    window.location.href = 'index-2.html'
})
$('.address-wrapper').on('click', '.address', function() {
    var id = $(this).attr('data-id');
    console.log(id);
    window.location.href = `/address/index-2.html?cid=${id}`;
})
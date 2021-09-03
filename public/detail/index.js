(function() {
    var id = parseInt($.query.get("id"));
    console.log(id);

    function getData() {
        $.ajax({
            type: 'get',
            url: `/product/model/${id}`,
            success: function(res) {
                let img = (res.data.bannerImgs.split(','));
                console.log(res);
                $('.swiper-slide>img').each(function(index) {
                        $(this).attr("src", img[index]);
                    })
                    // $('.swiper-container').html(html);
                $('.price').text('￥' + res.data.price);
                $('.name').text(res.data.name);
                $('.detail').text(res.data.brief);
                let otherimg = (res.data.otherImgs.split(','));
                let str = "";
                otherimg.forEach(function(item) {
                    str += `<img src="${item}" alt="">`;
                })
                $('.other-pic').html(str);

            }
        });

    }
    getData();

    $('.left-btn').on('click', function() {
        let cookie = Cookies.get('token');
        $.ajax({
            type: 'post',
            url: `/cart/add`,
            data: { pid: id, count: 1 },
            headers: {
                Authorization: cookie
            },
            success: function(res) {
                if (res.code !== 200) {
                    alert(res.msg);
                    return;
                }
                layer.msg("加入购物车成功");
            }
        });
    })
})();

imagesLoaded(document.querySelector('.banner'), function() {
    console.log('??');
    var mySwiper = new Swiper('.banner', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.banner>.swiper-pagination',
            type: 'fraction',
        },

        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: '.banner>.swiper-button-next',
        //   prevEl: '.banner>.swiper-button-prev',
        // },

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
    });
});
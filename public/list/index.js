(function() {
    var cid = parseInt($.query.get("cid")) || 17;
    var cName = $.query.get("cName") || "电视机";
    var name = ""; //搜索框输入的字符串
    var orderCol = "price"; //排序方案 price sale rate评论
    var orderDir = "asc"; //asc升序 desc降序
    var pageSize = 6; //每页显示多少条 分页用
    var isloading = false; //标识当前是否有未完成的ajax
    var hasMore = true; //标识按当前条件看商品 还有没有更多可以看
    var scroll = null; //保存new IScroll的结果
    var isTriggerLoadMore = false; //表示再滚动中是否触发了加载更多
    //发ajax
    /*公共的获取商品数据的函数
    （1．刚进来 false
    2. ordercol变化的时候 f
    3.orderDir变化的时候 f
    4.上拉加载更多时 t
    5．点击搜索按钮时 f
 */
    function updateTip() {
        if (isloading) $('.tip').text('...加载中')
        else if (isTriggerLoadMore) $('.tip').text('...下拉加载更多')
        else if ($('ul.list li').length === 0) $('.tip').text('...暂无相关商品')
        else $('.tip').text('...没有更多商品')
    }

    function initOrRefreshScroll() {
        //等滚动区域加载完毕，高、宽确定后再进行
        imagesLoaded($('.content')[0], function() {
            if (scroll === null) {
                scroll = new IScroll($('.content')[0], {
                    deceleration: 0.003, //设置阻尼系数
                    bounce: false, //关闭边界回弹
                    probeType: 2, //开启滚动监听
                    click: true
                });

                scroll.on('scroll', function() {
                    if (isloading || !hasMore) return; //不再触发

                    isTriggerLoadMore = scroll.y - scroll.maxScrollY === 0;
                    updateTip();



                    // console.log(scroll.y);
                    //console.log(maxScroll.y);

                });
                scroll.on('scrollEnd', function() {
                    if (isTriggerLoadMore) {
                        isTriggerLoadMore = false;
                        getData(true);
                    }
                });

            } else {
                scroll.refresh(); //更新滚动区域
            }

        })
    }

    function getData(isLoadMore = false) {
        if (isLoadMore == false) {
            $('.list').empty();
            scroll && scroll.scrollTo(0, 0, 0);
        }
        isloading = true;
        updateTip();
        $.ajax({
            type: "post",
            url: "/product/list",
            data: {
                name: name,
                cid: cid,
                orderCol: orderCol,
                orderDir,
                begin: $('ul.list li').length,
                pageSize
            },
            success: function(res) {

                if (res.code !== 200) { return; }
                hasMore = res.data.length === pageSize;
                console.log(res);
                res.data.forEach(function(item) {
                    document.querySelector('.list').innerHTML += setHtml(item);
                });



                initOrRefreshScroll(); //调用滚动函数
                isloading = false; //ajax完成 能执行点击事件
                updateTip();
            }
        });
    }
    getData();

    function setHtml(good) {
        console.log("????");
        var html = "";
        html = `
        <li class="good">
        
        <a href="/detail/index.html?id=${good.id}">
        <div class="left"><img src="${good.avatar}" alt="" class="avatar"></div>
        
        <div class="right">
        <span class="name">${good.name}</span>
        <span class="brief">${good.brief}</span>
        <span class="price">￥${good.price}</span>
        <span class="sale">销售：${good.sale}</span>
        <span class="rate">评论数：${good.rate}</span>
        </div>
        </a>

    </li> 
        `;
        return html;
    }

    //排序切换
    $('.line-2').on('click', 'span', function() {
        if (isloading) { return }
        if ($(this).hasClass('active')) {
            orderDir = orderDir === 'asc' ? 'desc' : 'asc';
            $(this).parents().children().toggleClass("asc desc");

        } else {
            orderCol = $(this).attr('data-col');
            $(this).addClass('active').siblings('.active').removeClass('active');
        }
        getData();
    })
})();
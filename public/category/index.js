// 发ajax请求一级分类数据，并动态渲染
$.ajax({
    type: "get",
    // url:"http://localhost:3000/category/list/0"
    url: "/category/list/0",
    // 请求成功响应回调函数 参数res为响应数据
    success: function(response) {
        if (response.code !== 200) {
            console.log(response.msg);
            return;
        }
        var htmlStr = "";
        response.data.forEach(function(item) {
            htmlStr += `
			<li data-id='${item.id}' data-avatar='${item.avatar}'>
			<span>${item.name}</span>
			</li>
			`;
        })
        $('ul.list-main').html(htmlStr).find('li').eq(0).trigger('click');
    }
});
//给ul.list-main 绑定点击事件，实现一级分类切换
$('ul.list-main').on('click', function(e) {
    var $li = e.target.tagName === "LI" ? $(e.target) : $(e.target).parent();
    console.log($li);
    var $id = parseInt($li.attr('data-id'));
    if ($li.hasClass('active')) return;
    $li.addClass('active').siblings('.active').removeClass();
    // 右上角一级分类图片切换
    $('img.avatar').attr('src', $li.attr('data-avatar'));
    // 请求二级分类数据，并渲染
    $.ajax({
        url: '/category/list/' + $id,
        success: function(res) {

            if (res.code !== 200) { console.log(response.msg); return; }
            $('ul.list-sub').empty();

            if (res.data.length) {
                console.log(res);
                $('p.tip').hide();
                var htmlStr = "";
                // href="/list/index.html?键=值&。。
                res.data.forEach(function(item) {
                    htmlStr += `
						<li class="sub-li">
							<a href="/list/index.html?cid=${item.id}&cName=${item.name}">
								<img src="${item.avatar}" class="sub-pic">
								<span class="good-name">${item.name}</span>
							</a>
						</li>
						`;
                })
                $('ul.list-sub').html(htmlStr);
                $('ul.list-sub').show();
            } else {
                $('p.tip').show();
                $('ul.list-sub').hide();
            }
        }
    });
})
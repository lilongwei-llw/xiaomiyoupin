var $loginForm= $('form.login').Validform({
	tiptype:3
});
$('button.btn-login').on('click',function(){
	//表单验证
	if(!$loginForm.check(false))return;
	//发ajax验证
	$.ajax({
		type:"post",
		url:"/user/login_pwd",
		data:{name:$('.name').val().trim(),pwd:$('.pwd').val().trim()},
		success:function(res){
			if (res.code !== 200) {
			    layer.msg(res.msg);
			    return;
			}
			layer.msg("登陆成功");
			Cookies.set('token',res.data);
			Cookies.set('name',$('.name').val().trim());
			window.location.replace(document.referer||'/home/index.html');//这个写法注意
			//console.log(res);
			
		}
	})
})
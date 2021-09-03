# xiaomiyoupin
小米有品移动端前端项目
项目名称：小米有品移动端前端项目 项目内容： （1）首页home（2）地址管理address （3）商品详情页面：detail （4）分类页面：category（5）登录+注册页面：login （6）购物车页面：cart （7）订单支付页order_pay（8）个人页person
（9）商品列表页 product-list（10）订单生成页（11）订单提交页（12）个人的订单页面 

所用技术：ajax、jQuery、js、html、css

具体实现效果：
 
1.首页：（1）html、css、jquery+插件为静态页面

2.地址管理：地址增删改查+默认地址， 利用ajax前后端数据交互

3.商品详情页面： 查看商品详情信息，商品加入购物车；生成购物记录 利用ajax前后端数据交互

4.商品列表页：查看某一类商品，ajax获取后端数据动态渲染页面 能按多个条件进行排序 并实现动态加载 

5.登录+注册页面： 利用插件前端输入验证， ajax存储信息至数据库同时服务器进行验证 ，服务器发送token存至cookie用于以后验证

6.购物车页面：购物车数据动态渲染， 物品数量增删 计算总价格 ajax前后端数据交互

7.订单生成+提交+支付页面： 选择购物车中任意物品生成订单，能选择或添加地址，提交订单 ，ajax发送数据后端生成订单信息， 可选择继续支付

8.个人订单页面 ：查看所有订单、已付款、未付款订单

完成项目中一整套购物流程，约12个页面。 利用ajax进行前端与数据库交互功能，并用一系列插件辅助和完善功能 所用插件：layer、imagesloadsd、iscroll-probe、js-cookie等
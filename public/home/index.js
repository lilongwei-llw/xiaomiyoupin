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
  })
(function () {
  // 完成横幅区的图片切换
  // 横幅区数据
  var datas = [
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920",
      link: "https://www.mi.com/mi11le-5g-ne",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/xiaomipad5",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
      link: "https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6",
    },
  ];

  /**
   * 1.动态切换图片（多次）
   *    更改a元素的href,和img
   * 2.动态生成span元素（只做一次）
   *    有几张图片就生成几个span
   * 3.动态改变span的状态（多次）
   *    动态改变选中的状态
   */

  function $(selector) {
    return document.querySelector(selector);
  }

  //需要获取的dom
  var bannerDots = $(".banner-dots");
  var bannerCover = $(".banner-cover");
  var bannerCoverImg = bannerCover.querySelector("img");

  var pointerLeft = $(".banner-pointer-left");
  var pointerRight = $(".banner-pointer-right");

  var banner = $(".banner");
  /**
   * 初始化（只做一次的）
   */
  function init() {
    for (var i = 0; i < datas.length; i++) {
      var span = document.createElement("span");
      span.className = "fl";
      bannerDots.appendChild(span);
    }

    //默认第一张图片
    change(0);
  }
  init();

  /**
   * 将指定下标的数据显示到页面上
   * @param {number} index 传入需要改变图片的下标
   */
  function change(index) {
    //设置对应的图片和超链接
    bannerCover.href = datas[index].link;
    bannerCoverImg.src = datas[index].img;

    //设置span的选中效果（选中前得判断是否已经存在选中效果，如若存在就移除，在设置对应得选中效果，如果不选在，则直接设置选中效果）
    var spans = bannerDots.querySelectorAll("span");
    var selected = bannerDots.querySelector(".banner-dots-selected");
    if (selected) {
      selected.className = "fl";
    }
    spans[index].className = "banner-dots-selected fl";
  }

  /**
   * 向前翻页
   */
  var index = 0; //当前是第几页（默认在第一页）
  function toPrev() {
    index--;
    if (index < 0) {
      index = datas.length - 1;
    }
    change(index);
  }

  /**
   * 向后翻页
   */
  function toNext() {
    index++;
    if (index > datas.length - 1) {
      index = 0;
    }

    change(index);
  }

  /**
   * 注册事件
   */
  //给左右箭头注册事件
  pointerLeft.onclick = toPrev;
  pointerRight.onclick = toNext;

  //给span小点注册事件
  /**
   * 1.循环bannerDots,
   * 2.点击每个小点，就把小点对应的下标传给change()函数，让它调用，
   * 3再把下标赋值为当前下标，保证不影响toPrev(),toNext()函数的使用
   */

  for (var i = 0; i < bannerDots.children.length; i++) {
    (function (i) {
      bannerDots.children[i].onclick = function (e) {
        index = i;
        change(i);
      };
    })(i); //立即执行函数，解决在循环中注册事件的报错（作用域的问题）
  }

  //自动播放
  /**
   * 开始播放
   */
  var timerId;
  function start() {
    if (timerId) {
      return;
    }
    timerId = setInterval(toNext, 1500);
  }
  /**
   * 结束播放
   */
  function stop() {
    clearInterval(timerId);
    timerId = null;
  }

  start();
  /**
   * 当鼠标移入banner区域的时候，停止播放
   * 当鼠标移出时，开始播放
   */
  banner.onmouseenter = stop;
  banner.onmouseleave = start;
})();

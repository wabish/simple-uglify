(function(a) {
    a.fn.rollingBanner = function(b) {
        var c = {
            moveSpeed: 500,
            autoRollingTime: 5000
        };
        a.extend(c, b);
        return this.each(function() {
            var $imgBox = a(this);
            var imgObj = $('.slide-img li')
            var $prevBtn = $(".slide-prev");
            var $nextBtn = $(".slide-next");
            var imgNum = imgObj.length;
            var showNum = 4;
            var action = "next";
            var slideTimeout;
            var imgShowArr = [];//显示图片数据
            var imgArr = [];//所有图片数据
            var focusIndex = 0;
            initImgBox();
            function initImgBox() {
                getShowImgData();
                bindAction();
                getSlide();
            }
            function getShowImgData() {
                for (var i = 0; i < imgNum; i++) {
                    var img = imgObj.eq(i);
                    if (i < showNum) {
                        imgShowArr[i] = {
                            left: img.position().left,
                            top: img.position().top,
                            zIndex: img.css("z-index"),
                            width: img.width()
                        };
                        img.css("left", imgShowArr[i].left)
                    } else {
                        img.css("left", imgShowArr[showNum - 1].left)
                    }
                    imgArr.push(img);
                }
            }
            function bindAction() {
                $imgBox.on('mouseenter',function() {
                    clearInterval(slideTimeout)
                }).on('mouseleave',function() {
                    getSlide();
                });
                $nextBtn.off().on("click",function() {
                    action = "next";
                    if (focusIndex === imgNum - 1) {
                        focusIndex = 0 ;
                    } else {
                        focusIndex++ ;
                    }
                    changeCss();
                });
                $prevBtn.off().on("click",function() {
                    action = "prev";
                    if (focusIndex == 0) {
                        focusIndex = imgNum - 1;
                    } else {
                        focusIndex--;
                    }
                    changeCss();
                })
            }
            function changeCss() {
                if (action == "next") {
                    for (var i = 0; i < showNum; i++) {
                        var imgPrev;
                        if (i == 0) {
                            imgPrev = imgShowArr[showNum - 1];
                        } else {
                            imgPrev = imgShowArr[i - 1];
                        }
                        imgArr[i].animate({
                            "z-index": imgPrev.zIndex,
                            left: imgPrev.left,
                            top: imgPrev.top,
                            width: imgPrev.width
                        },
                        c.moveSpeed)
                    }
                    imgArr.push(imgArr.shift())
                } else {
                    for (i = 0; i < showNum; i++) {
                        var imgNext ;
                        if (i == showNum - 1) {
                            imgNext = imgShowArr[0];
                        } else {
                            imgNext = imgShowArr[i + 1];
                        }
                        imgArr[i].animate({
                            "z-index": imgNext.zIndex,
                            left: imgNext.left,
                            top: imgNext.top,
                            width: imgNext.width
                        },
                        c.moveSpeed)
                    }
                    imgArr.unshift(imgArr.pop())
                }
            }
            function getSlide() {
                slideTimeout = setInterval(slide, c.autoRollingTime)
            }
            function slide() {
                $nextBtn.click()
            }
        })
    }
})(jQuery);

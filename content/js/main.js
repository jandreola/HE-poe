(function(){
    var video = document.getElementById('video');
    video.play();

    var frameOne = setInterval(function(){
        video.currentTime = 0;
    }, 2000);


    function nextFrame(frame) {
        $('.frame-one').removeClass('in');
        clearInterval(frameOne);
        video.currentTime = 2;
        setTimeout(function(){
            $('.frame-two').addClass('in');
            setInterval(function(){
                video.currentTime = 5;
            }, 4000);
        }, 3000);
    }

    var lastScrollTop = 0;
    $(window).on('scroll', function(){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            if(st > 1 && st < 200) {
                nextFrame(2);
            }
        } else {
          // upscroll code
        }
        lastScrollTop = st;
    });
}());
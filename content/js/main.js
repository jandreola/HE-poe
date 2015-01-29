(function(){
    var video = document.getElementById('video');
    video.play();

    var frameOne = setInterval(function(){
        video.currentTime = 0;
    }, 2000);

    $('body').on('click', function(){
        if(video.paused){
            video.play();
            var frameThree = setInterval(function(){
                video.currentTime = 5;
            }, 4000);
        } else {
            clearInterval(frameOne);
            video.currentTime = 2;
            setTimeout(function(){
                video.pause();
            }, 3000);
        }
    });

    var lastScrollTop = 0;
    $(window).on('scroll', function(){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
           // downscroll code
        } else {
          // upscroll code
        }
        lastScrollTop = st;
    });
}());
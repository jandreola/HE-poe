(function(){
    var totalLength = $('.frame').length;
    var increment = 100;
    var windowHeight = $(window).height();
    $('body').height(windowHeight + (totalLength * increment));

    var video = document.getElementById('video');
    video.play();

    var frameOne = setInterval(function(){
        video.currentTime = 0;
    }, 2000);


    function nextFrame(frameNumber) {
        $('.frame').removeClass('in');
        $('.frame:nth-child('+frameNumber+')').addClass('in');
        // clearInterval(frameOne);
        // video.currentTime = 2;
        // setTimeout(function(){
        //     $('.frame-two').addClass('in');
        //     setInterval(function(){
        //         video.currentTime = 5;
        //     }, 4000);
        // }, 3000);
    }

    var lastScrollTop = 0;
    $(window).on('scroll', function(){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            var frame = st / increment;
            frame = Math.ceil(frame);
            nextFrame(frame);
        } else {
          // upscroll code
        }
        lastScrollTop = st;
    });
}());
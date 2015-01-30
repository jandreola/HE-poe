/*
 * Klick Frame Switcher
 * Manage sync between page sections and video clips playback.
 */
var KFS = function(options) {
    /*
     * Default options
     */
    var settings = {
        scrollSize: 100,   // Amount to scroll before switch frames
        selector: '.frame' // Individual frame selector
    };
    $.extend(settings, options);
    

    /*
     * Set body height based on number of sections on page
     */
    function setBodyHeight() {
        var totalFrames = $(settings.selector).length,
            windowHeight = $(window).height();

        windowHeight += totalFrames * settings.scrollSize;
        $('body').height(windowHeight);
    }

    function init(){
        setBodyHeight();
    }

    return init();
    
};






// (function(){
//     var totalLength = $('.frame').length;
//     var increment = 100;
//     var windowHeight = $(window).height();
//     $('body').height(windowHeight + (totalLength * increment));

//     var video = document.getElementById('video');
//     video.play();

//     var frameOne = setInterval(function(){
//         video.currentTime = 0;
//     }, 2000);


//     function nextFrame(frameNumber) {
//         $('.frame').removeClass('in');
//         $('.frame:nth-child('+frameNumber+')').addClass('in');
//         // clearInterval(frameOne);
//         // video.currentTime = 2;
//         // setTimeout(function(){
//         //     $('.frame-two').addClass('in');
//         //     setInterval(function(){
//         //         video.currentTime = 5;
//         //     }, 4000);
//         // }, 3000);
//     }

//     var lastScrollTop = 0;
//     $(window).on('scroll', function(){
//         var st = $(this).scrollTop();
//         if (st > lastScrollTop){
//             var frame = st / increment;
//             frame = Math.ceil(frame);
//             nextFrame(frame);
//         } else {
//           // upscroll code
//         }
//         lastScrollTop = st;
//     });
// }());
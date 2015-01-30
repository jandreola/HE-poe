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
        selector: '.frame', // Individual frame selector
        videoId: 'video',
        frames: [] // MUST be passed
    };
    $.extend(settings, options);

    var video = document.getElementById(settings.videoId);

    function testOptions(options){
        if(!options.frames.length){
            console.error('No video clips defined.');
        }
    }

    /*
     * Set body height based on number of sections on page
     */
    function setBodyHeight() {
        var totalFrames = $(settings.selector).length,
            windowHeight = $(window).height();

        windowHeight += totalFrames * settings.scrollSize;
        $('body').height(windowHeight);
    }

    /*
     * Improved scroll event with current position and direction
     */
    function detectScrollDirection(){
        var lastScrollTop = 0;
        $(window).on('scroll', function(){
            var st = $(this).scrollTop();
            if (st > lastScrollTop){
                $(window).trigger('scroll:down', st);
            } else {
                $(window).trigger('scroll:up', st);
            }
            lastScrollTop = st;
        });
    }

    /*
     * 
     */
    function selectFrame(frame){
        video.play();
    }

    function init(){
        testOptions(settings);

        setBodyHeight();
        detectScrollDirection();
        selectFrame(1);
    }

    return init();
    
};






// (function(){
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

    
// }());
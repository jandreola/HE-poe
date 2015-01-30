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
        initialFrame: 0,
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
     * Changes class to active section and plays the video
     * on the right clip
     */
    var loop,
        currentFrame = settings.initialFrame;
    function selectFrame(frame){
        var nthChild = Number(frame) + 1; //Frame selector
        clearInterval(loop); // Clear any previous intervals

        // Switch 'in' class from previous frame to new frame
        $(settings.selector).removeClass('in');

        var gap = calculateGap(currentFrame, frame);
        video.currentTime = settings.frames[currentFrame].end;
        
        setTimeout(function(){
            $(settings.selector + ':nth-child('+ nthChild +')').addClass('in');
            var fOptions = settings.frames[frame];
            video.currentTime = fOptions.start;
            loop = setInterval(function(){
                video.currentTime = fOptions.start;
            }, fOptions.end * 1000);
            
            currentFrame = frame;
        }, gap * 1000);

        // Set video start, end and loops it

    }

    /*
     * Calculates gap in seconds between current frame
     * and next frame, this is basically the transition
     * between frames
     */
    function calculateGap(current, next){
        var frames = settings.frames;
        var gap = frames[next].start - frames[current].end;

        return gap;
    }

    function bindMenus(){
        $('#main-nav').on('click', 'li', function(){
            var frame = $(this).attr('data-frame-selector');
            selectFrame(frame);
        });
    }

    function init(){
        testOptions(settings);
        setBodyHeight();
        bindMenus();
        detectScrollDirection();
        selectFrame(settings.initialFrame);
        video.play();
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
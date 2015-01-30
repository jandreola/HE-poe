/*
 * Klick Frame Switcher
 * Manage sync between page sections and video clips playback.
 */
var KFS = function(options) {
    ///////////
    // SETUP //
    ///////////

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

    /////////////
    // HELPERS //
    /////////////
    
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

    /*
     *  Detect scroll direction and position
     */
    function detectScrollDirection(){
        var lastScrollTop = 0;
        $(window).on('scroll', function(){
            var st = $(this).scrollTop();
            if (st > lastScrollTop){
                checkFrameChange('down', st);
            } else {
                checkFrameChange('up', st);
            }
            lastScrollTop = st;
        });
    }

    ////////////////
    // NAVIGATION //
    ////////////////
    function bindMenus(){
        $('#main-nav').on('click', 'li', function(){
            var frame = $(this).attr('data-frame-selector');
            selectFrame(frame);
        });
    }

    function checkFrameChange(direction, position){
            position = position || 1; // avoid division by zero
            /*
             * TODO: better checking to avoid negative scroll number
             * or over scroll number
             */
            var frame = Math.ceil(position / settings.scrollSize);
            frame -= 1;
            selectFrame(frame);
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
        
        // Set video start, end and loops it
        setTimeout(function(){
            $(settings.selector + ':nth-child('+ nthChild +')').addClass('in');
            var fOptions = settings.frames[frame];
            video.currentTime = fOptions.start;
            loop = setInterval(function(){
                video.currentTime = fOptions.start;
            }, fOptions.end * 1000);
            
            currentFrame = frame;
        }, gap * 1000);


    }



    //////////
    // INIT //
    //////////
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
(function(){

    var options = {
        scrollSize: 100,
        initialFrame:0,
        frames: [
            {start: 0, end: 3},
            {start: 21, end: 6},
        ]
    };

    KFS(options);
    
}());
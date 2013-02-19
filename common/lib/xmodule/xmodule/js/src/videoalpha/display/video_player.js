(function (requirejs, require, define) {

// VideoPlayer module.
define(
'videoalpha/display/video_player.js',
['videoalpha/display/html5_video.js', 'videoalpha/display/bind.js'],
function (HTML5Video, bind) {

    // VideoPlayer() function - what this module "exports".
    return function (state) {
        state.videoPlayer = {};

        makeFunctionsPublic(state);
        renderElements(state);
        bindHandlers();
        registerCallbacks(state);
    };

    // ***************************************************************
    // Private functions start here.
    // ***************************************************************

    // function makeFunctionsPublic(state)
    //
    //     Functions which will be accessible via 'state' object. When called, these functions will
    //     get the 'state' object as a context.
    function makeFunctionsPublic(state) {
        state.videoPlayer.pause                       = bind(pause, state);
        state.videoPlayer.play                        = bind(play, state);
        state.videoPlayer.update                      = bind(update, state);
        state.videoPlayer.onVolumeChange              = bind(onVolumeChange, state);
        state.videoPlayer.onSpeedChange               = bind(onSpeedChange, state);
        state.videoPlayer.onSeek                      = bind(onSeek, state);
        state.videoPlayer.onEnded                     = bind(onEnded, state);
        state.videoPlayer.onPause                     = bind(onPause, state);
        state.videoPlayer.onPlay                      = bind(onPlay, state);
        state.videoPlayer.onUnstarted                 = bind(onUnstarted, state);
        state.videoPlayer.handlePlaybackQualityChange = bind(handlePlaybackQualityChange, state);
        state.videoPlayer.onPlaybackQualityChange     = bind(onPlaybackQualityChange, state);
        state.videoPlayer.onStateChange               = bind(onStateChange, state);
        state.videoPlayer.onReady                     = bind(onReady, state);
    }

    // function renderElements(state)
    //
    //     Create any necessary DOM elements, attach them, and set their initial configuration. Also
    //     make the created DOM elements available via the 'state' object. Much easier to work this
    //     way - you don't have to do repeated jQuery element selects.
    function renderElements(state) {
        var youTubeId;

        if (state.videoType === 'youtube') {
            state.videoPlayer.PlayerState = YT.PlayerState;
            state.videoPlayer.PlayerState.UNSTARTED = -1;
        } else { // if (state.videoType === 'html5') {
            state.videoPlayer.PlayerState = HTML5Video.PlayerState;
        }

        state.videoPlayer.currentTime = 0;

        state.videoPlayer.playerVars = {
            'controls': 0,
            'wmode': 'transparent',
            'rel': 0,
            'showinfo': 0,
            'enablejsapi': 1,
            'modestbranding': 1
        };

        if (state.currentPlayerMode !== 'flash') {
            state.videoPlayer.playerVars.html5 = 1;
        }

        if (state.config.start) {
            state.videoPlayer.playerVars.start = state.config.start;
            state.videoPlayer.playerVars.wmode = 'window';
        }
        if (state.config.end) {
          state.videoPlayer.playerVars.end = state.config.end;
        }

        if (state.videoType === 'html5') {
            state.videoPlayer.player = new HTML5Video.Player(state.el, {
                'playerVars':   state.videoPlayer.playerVars,
                'videoSources': state.html5Sources,
                'events': {
                    'onReady':       state.videoPlayer.onReady,
                    'onStateChange': state.videoPlayer.onStateChange
                }
            });
        } else if (state.videoType === 'youtube') {
            if (state.currentPlayerMode === 'flash') {
                youTubeId = state.youtubeId();
            } else {
                youTubeId = state.youtubeId('1.0');
            }
            state.videoPlayer.player = new YT.Player(state.id, {
                'playerVars': state.videoPlayer.playerVars,
                'videoId': youTubeId,
                'events': {
                    'onReady': state.videoPlayer.onReady,
                    'onStateChange': state.videoPlayer.onStateChange,
                    'onPlaybackQualityChange': state.videoPlayer.onPlaybackQualityChange
                }
            });
        }
    }

    // function bindHandlers(state)
    //
    //     Bind any necessary function callbacks to DOM events (click, mousemove, etc.).
    function bindHandlers() {

    }

    // function registerCallbacks(state)
    //
    //     Register function callbacks to be called by other modules.
    function registerCallbacks(state) {
        state.callbacks.videoControl.togglePlaybackPlay.push(state.videoPlayer.play);
        state.callbacks.videoControl.togglePlaybackPause.push(state.videoPlayer.pause);

        state.callbacks.videoQualityControl.toggleQuality.push(state.videoPlayer.handlePlaybackQualityChange);
    }

    // function reinitAsFlash(state)
    //
    //     When we are about to play a YouTube video in HTML5 mode and discover that we only
    //     have one available playback rate, we will switch to Flash mode. In Flash speed
    //     switching is done by reloading videos recorded at differtn frame rates.
    function reinitAsFlash(state) {
        // Remove from the page current iFrame with HTML5 video.
        state.videoPlayer.player.destroy();

        // Remember for future page loads that we should use Flash mode.
        $.cookie('current_player_mode', 'flash', {
            expires: 3650,
            path: '/'
        });
        state.currentPlayerMode = 'flash';

        // Removed configuration option that requests the HTML5 mode.
        delete state.videoPlayer.playerVars.html5;

        // Reuqest for the creation of a new Flash player
        state.videoPlayer.player = new YT.Player(state.id, {
            'playerVars': state.videoPlayer.playerVars,
            'videoId': state.youtubeId(),
            'events': {
                'onReady': state.videoPlayer.onReady,
                'onStateChange': state.videoPlayer.onStateChange,
                'onPlaybackQualityChange': state.videoPlayer.onPlaybackQualityChange
            }
        });
    }

    // ***************************************************************
    // Public functions start here.
    // These are available via the 'state' object. Their context ('this' keyword) is the 'state' object.
    // The magic private function that makes them available and sets up their context is makeFunctionsPublic().
    // ***************************************************************

    function pause() {
        if (this.videoPlayer.player.pauseVideo) {
            this.videoPlayer.player.pauseVideo();
        }
    }

    function play() {
        if (this.videoPlayer.player.playVideo) {
            this.videoPlayer.player.playVideo();
        }
    }

    function update() { }

    function onVolumeChange() { }

    function onSpeedChange() { }

    function onSeek() { }

    function onEnded() { }

    function onPause() {
        $.each(this.callbacks.videoPlayer.onPause, function (index, value) {
            // Each value is a registered callback (JavaScript function object).
            value();
        });
    }

    function onPlay() {
        $.each(this.callbacks.videoPlayer.onPlay, function (index, value) {
            // Each value is a registered callback (JavaScript function object).
            value();
        });
    }

    function onUnstarted() { }

    function handlePlaybackQualityChange(value) {
        this.videoPlayer.player.setPlaybackQuality(value);
    }

    function onPlaybackQualityChange() {
        var quality;

        quality = this.videoPlayer.player.getPlaybackQuality();

        $.each(this.callbacks.videoPlayer.onPlaybackQualityChange, function (index, value) {
            // Each value is a registered callback (JavaScript function object).
            value(quality);
        });
    }

    function onReady() {
        var availablePlaybackRates, baseSpeedSubs, _this;

        availablePlaybackRates = this.videoPlayer.player.getAvailablePlaybackRates();
        if ((this.currentPlayerMode === 'html5') && (this.videoType === 'youtube')) {
            if (availablePlaybackRates.length === 1) {
                reinitAsFlash(this);

                return;
            } else if (availablePlaybackRates.length > 1) {
                // We need to synchronize available frame rates with the ones that the user specified.

                baseSpeedSubs = this.videos['1.0'];
                _this = this;
                $.each(this.videos, function(index, value) {
                    delete _this.videos[index];
                });
                this.speeds = [];
                $.each(availablePlaybackRates, function(index, value) {
                    _this.videos[value.toFixed(2).replace(/\.00$/, '.0')] = baseSpeedSubs;
                    _this.speeds.push(value.toFixed(2).replace(/\.00$/, '.0'));
                });

                this.setSpeed($.cookie('video_speed'));
            }
        }

        if (this.currentPlayerMode === 'html5') {
            this.videoPlayer.player.setPlaybackRate(this.speed);
        }

        if (!onTouchBasedDevice()) {
            this.videoPlayer.play();
        }
    }

    function onStateChange(event) {
        switch (event.data) {
            case this.videoPlayer.PlayerState.UNSTARTED:
                this.videoPlayer.onUnstarted();
                break;
            case this.videoPlayer.PlayerState.PLAYING:
                this.videoPlayer.onPlay();
                break;
            case this.videoPlayer.PlayerState.PAUSED:
                this.videoPlayer.onPause();
                break;
            case this.videoPlayer.PlayerState.ENDED:
                this.videoPlayer.onEnded();
                break;
        }
    }
});

}(RequireJS.requirejs, RequireJS.require, RequireJS.define));

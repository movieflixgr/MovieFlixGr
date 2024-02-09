    private void iniExoPlayer_m3u8() {

        HlsMediaSource createMediaSource = new HlsMediaSource.Factory(new DefaultHttpDataSource.Factory())
                .setAllowChunklessPreparation(true).createMediaSource((MediaItem.fromUri(channel.getVideo())));

        initializeStream(createMediaSource);

    }

    private void iniExoPlayer_mp4() {

        MediaSource createMediaSource = new ProgressiveMediaSource.Factory(new DefaultHttpDataSource.Factory())
                .createMediaSource((MediaItem.fromUri(channel.getVideo())));

        initializeStream(createMediaSource);

    }

    private void iniExoPlayer_mpd() {

        DashMediaSource createMediaSource = new DashMediaSource.Factory(new DefaultHttpDataSource.Factory())
                .createMediaSource((MediaItem.fromUri(channel.getVideo())));

        initializeStream(createMediaSource);

    }

    public void initializeStream(MediaSource mediaSource) {

        trackSelector = new DefaultTrackSelector(this);

        ExoPlayer build = new ExoPlayer.Builder(this).setTrackSelector(trackSelector).build();

        simpleExoPlayer = build;

        playerView.setKeepScreenOn(true);

        playerView.setPlayer(build);

        simpleExoPlayer.setMediaSource(mediaSource);

        simpleExoPlayer.prepare();

        simpleExoPlayer.setPlayWhenReady(true);

    }

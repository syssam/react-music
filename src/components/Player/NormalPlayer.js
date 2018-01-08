import React from 'react';
import './NormalPlayer.less';

const NormalPlayer = (props) => {
    return (
        <div className="normal-player">
            <div className="background">
                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000" />
            </div>
            <div className="header">
                <button className="back"><i className="icon fa fa-chevron-down" aria-hidden="true"></i></button>
                <h1 className="title">演员</h1>
                <h2 className="sub-title">薛之谦</h2>
            </div>
            <div className="middle">
                <div className="cd-wrapper">
                    <div className="cd-container">
                        <div className="cd">
                            <img className="image playing" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000" />
                        </div>
                    </div>
                </div>
                <div className="lyric-container"></div>
            </div>
            <div className="bottom">
                <div className="progress-wrapper">
                    <div className="time start-time">0:00</div>
                    <div className="progress-bar">
                        <div className="progress-bar-container">
                            <div className="progress-bar-inner">
                                <div className="progress"></div>
                                <div className="progress-btn-wrapper">
                                    <div className="progress-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="time end-time">4:00</div>
                </div>
                {
                /*
                    fa-random
                    fa-retweet 顺序播放
                    fa-repeat 单曲循环
                */
                }
                <div className="controls-group">
                    <div className="flex-1 align-right"><button><i class="fa fa-random" aria-hidden="true"></i></button></div>
                    <div className="flex-1 align-right"><button><i class="fa fa-backward" aria-hidden="true"></i></button></div>
                    <div className="flex-1 align-center"><button className="play-btn"><i class="fa fa-play-circle-o" aria-hidden="true"></i></button></div>
                    <div className="flex-1 align-left"><button><i class="fa fa-forward" aria-hidden="true"></i></button></div>
                    <div className="flex-1 align-left"><button><i class="fa fa-heart-o" aria-hidden="true"></i></button></div>
                </div>
            </div>
        </div>
    );
}

export default NormalPlayer;
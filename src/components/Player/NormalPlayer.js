import React from 'react';
import ProgressBar from '../Common/ProgressBar';
import Icon from '../Common/Icon';
import './NormalPlayer.less';

const NormalPlayer = (props) => {
    const playIcon = props.isPlaying ? "pause-circle" : "play-circle";
    return (
        <div className="normal-player">
            <div className="background">
                <img src={props.avatar} />
            </div>
            <div className="header">
                <button className="back" onClick={props.back}><Icon type="chevron-down" /></button>
                <h1 className="title">演员</h1>
                <h2 className="sub-title">{props.title}</h2>
            </div>
            <div className="middle">
                <div className="cd-wrapper">
                    <div className="cd-container">
                        <div className="cd">
                            <img className="image playing" src={props.avatar} />
                        </div>
                    </div>
                </div>
                <div className="lyric-container"></div>
            </div>
            <div className="bottom">
                <div className="progress-wrapper">
                    <div className="time start-time">0:00</div>
                    <ProgressBar percent={props.percent} onPercentChange={props.onPercentChange} />
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
                    <div className="flex-1 align-right"><button><Icon type="random" /></button></div>
                    <div className="flex-1 align-right"><button><Icon type="backward" /></button></div>
                    <div className="flex-1 align-center"><button className="play-btn" onClick={props.play}><Icon type={playIcon} style="r" /></button></div>
                    <div className="flex-1 align-left"><button><Icon type="forward" /></button></div>
                    <div className="flex-1 align-left"><button><Icon type="heart" style="r" /></button></div>
                </div>
            </div>
        </div>
    );
}

export default NormalPlayer;
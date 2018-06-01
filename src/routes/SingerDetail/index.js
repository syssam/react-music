import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import jsonp from '../../utils/jsonp';
import ScrollView from  '../../components/ScrollView';
import MusicList from '../../components/MusicList';
import Spin from '../../components/Common/Spin';
import './index.less';
import { 
    setPlayList,
    randomPlay,
    orderPlay,
    fullScreen,
    setCurrentSong
} from '../../actions/player'


const DEFAULT_OPTIONS = {
    probeType: 3,
}

class SingerDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: '',
            list: [],
            scrollY: 0,
            refListCoverStyle: {},
            refPlayButtonStyle: {},
            refBackgroundStyle: {},
            refBgCoverStyle: {}
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { scrollY } = this.state;

        if(prevState.scrollY !== scrollY) {
            this.scrollY(scrollY);
        }
    }

    _calculateHeight() {
        if (!this.refBackground) {
            return
        }
        
        if(this.backgroundHeight !== this.refBackground.clientHeight) {
            this.backgroundHeight = this.refBackground.clientHeight;
            this.refList.style.top = `${this.backgroundHeight}px`;
        }
    }

    componentWillMount() {
        if(this.props.location.state) {
            const { name, id } = this.props.location.state;
            if(name) {
                this.setState({
                    name: name,
                    avatar: `http://y.gtimg.cn/music/photo_new/T001R500x500M000${id}.jpg?max_age=2592000`,
                })
            }
        }
    }

    componentDidMount() {
        this.getSinger();
        this._calculateHeight();
    }

    getSinger = async () => {
        const singer = this.props.match.params.id;
        if(!singer) {
            this.props.history.push(`/singer`)
        }
        let response = await jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?inCharset=utf-8&outCharset=utf-8&format=jsonp&order=listen&begin=0&num=80&songstatus=1&singermid=${singer}`, {name: 'SingerJsonCallback'});
        const { list, singer_name, singer_mid } = response.data;
        let ret = [];

        //console.log(list);

        list.forEach(function(music) {
            ret.push({
                id: music.musicData.songmid,
                name: music.musicData.songname,
                desc: music.musicData.albumname,
                duration: music.musicData.interval,
                url: `http://dl.stream.qqmusic.qq.com/C100${music.musicData.songmid}.m4a`
            })
        })

        this.setState({
            name: singer_name,
            avatar: `http://y.gtimg.cn/music/photo_new/T001R500x500M000${singer_mid}.jpg?max_age=2592000`,
            list: ret
        })

        //let response = await jsonp(`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1278911659&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=002J4UUk29y8BY&filename=C400002J4UUk29y8BY.m4a`, {name: 'callback'});
    }

    scrollY(newY) {
        let coverHeight = this.backgroundHeight + newY;
        let scale = 1;
        let blur = 0;
        const formula = Math.abs((coverHeight-this.backgroundHeight) / this.backgroundHeight);

        //blur = Math.min(20 * formula, 20);
        if(this.backgroundHeight < coverHeight) {
            scale = 1 + formula;
        } else {
            blur = Math.min(20 * formula, 20);
        }

        this.setState({
            refBgCoverStyle: {
                filter: `blur(${blur}px) opacity(1)`
            }
        })

        if(coverHeight >= 44) {
            /*
            this.refListCover.style.top = `${coverHeight}px`;
            this.refPlayButton.style.display = 'block';
            this.refListCover.style.top = `${coverHeight}px`;
            this.refPlayButton.style.display = 'block';
            this.refBackground.style.zIndex = 0;
            this.refBackground.style.height = `auto`;
            this.refBackground.style.paddingTop = `50%`;
            */
            this.setState({
                refListCoverStyle: {
                    top: `${coverHeight}px`
                },
                refPlayButtonStyle: {
                    display: `block`
                },
                refBackgroundStyle: {
                    transform: `scale(${scale})`
                }
            })
        } else {

            /*
            this.refPlayButton.style.display = 'none';
            this.refBackground.style.height = `44px`;
            this.refBackground.style.paddingTop = `0px`;
            this.refBackground.style.zIndex = 10;
            */
            this.setState({
                refPlayButtonStyle: {
                    display: 'none'
                },
                refBackgroundStyle: {
                    height: 44,
                    paddingTop: `0px`,
                    zIndex: 10,
                }
            })
        }
    }

    onScroll = (pos) => {
        this.setState({
            scrollY: pos.y
        });
    }

    randomPlay = () => {
        const { list } = this.state
        this.props.setPlayList(list)
        this.props.randomPlay()
        this.props.fullScreen()
    }

    orderPlay = (index) => {
        const { list } = this.state
        this.props.setPlayList(list)
        this.props.setCurrentSong(index)
        this.props.orderPlay()
        this.props.fullScreen()
    }

    render() {
        const { name, avatar, list, refBackgroundStyle, refPlayButtonStyle, refListCoverStyle, refBgCoverStyle } = this.state;

        const bgImageStyle = {
            backgroundImage: avatar ? 'url(' + avatar + ')' : `unset`,
            ...refBackgroundStyle
        };

        return(
            <div className="singer-detail">
                <div className="header">
                    <Link to={'/singer'}>
                        <button className="back"><i className="icon fa fa-chevron-left" aria-hidden="true"></i></button>
                    </Link>
                    <h1 className="title">{name}</h1>
                </div>
                <div
                    className="bg-image"
                    style={bgImageStyle}
                    ref={(el) => { this.refBackground = el; }}>
                    <button
                        className="play-btn"
                        style={refPlayButtonStyle}>
                        <i className="fa fa-play-circle-o icon" aria-hidden="true"></i>
                        <span className="text" onClick={this.randomPlay}>随机播放全部</span>
                    </button>
                    <div className="bg-cover" style={refBgCoverStyle}></div>
                </div>
                <div className="list-cover" style={refListCoverStyle}></div>
                <div
                    className="list"
                    ref={(el) => { this.refList = el; }}>
                    <ScrollView
                        onScroll={this.onScroll}
                        options={DEFAULT_OPTIONS}
                        ref={(el) => { this.refScroll = el; }}>
                        <MusicList data={list} onClickItem={this.orderPlay} />
                        {list.length === 0 && <Spin />}
                    </ScrollView>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setPlayList,
        randomPlay,
        orderPlay,
        fullScreen,
        setCurrentSong
    }, dispatch)
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(SingerDetail));
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { 
	fullScreen,
	miniScreen,
	setCurrentSong,
	SCREEN_MODE_FULL
} from '../../actions/player'
import './index.less';

class Player extends React.PureComponent {
    constructor(props) {
		super(props);
		this.state = {
            canPlay: false,
            currentTime: 0,
      		currentLyric: null,
			currentLyricLine: 0,
			playingLyric: '无歌词数据',
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.canPlay) {
			this.audioRef.play()
		}
	}

	componentDidMount() {
	}

	percent = () => {
		return this.state.currentTime / this.props.currentSong.duration
	}

    back = () => {
		this.props.miniScreen();
	}

    open = () => {
		this.props.fullScreen();
	}
	
    onCanPlay = () => {
		this.setState({
            canPlay: true,
		})
    }

    onError = () => {
		this.setState({
            canPlay: false,
		})
	}
	
    onTimeUpdate = (e) => {
		this.setState({
            currentTime: e.target.currentTime,
		})
	}
	
	onEnded = () => {
		//console.log(this.state.currentTime / this.props.currentSong.duration);
	}

	onPercentChange = (newPercent) => {
		let currentTime = this.currentSong.duration * newPercent
		this.audioRef.currentTime = currentTime
		this.setState({
			currentTime: currentTime
		})
	}

	play = () => {
		this.setState({
			canPlay: true
		})
	}
	
	render() {
		const { isFullScreen, currentSong } = this.props;
		return(
			<div className="player">
				{ isFullScreen === true && <NormalPlayer back={this.back} play={this.play} isPlaying={this.state.canPlay} title={currentSong.singer} avatar={currentSong.avatar} percent={this.percent()} onPercentChange={this.onPercentChange} /> }
				{ isFullScreen === false && <MiniPlayer open={this.open} /> }
				<audio
					ref={(audioRef) => { this.audioRef = audioRef; }}
					onCanPlay={this.onCanPlay}
					onError={this.onError}
					onTimeUpdate={this.onTimeUpdate}
					onEnded={this.onEnded}
					src={currentSong.url}
				>Your browser does not support the audio element.</audio>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		isFullScreen: state.player.screenMode === SCREEN_MODE_FULL,
		currentSong: state.player.playList[state.player.currentIndex],
	}
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fullScreen,
        miniScreen,
        setCurrentSong
    }, dispatch)
}

Player.propTypes = {
};

// Specifies the default values for props:
Player.defaultProps = {
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(Player);
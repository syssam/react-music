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
		console.log("onCanPlay");
		this.setState({
            canPlay: true,
		})
    }

    onError = () => {
		console.log("onError");
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
		console.log(this.state.currentTime / this.props.currentSong.duration);
		console.log("onEnded");
	}

	onPercentChange = (newPercent) => {
		let currentTime = this.currentSong.duration * newPercent
		this.audioRef.currentTime = currentTime
		this.setState({
			currentTime: currentTime
		})
	}
	
	render() {
		const { isFullScreen, currentSong } = this.props;
		return(
			<div className="player">
				{ isFullScreen === true && <NormalPlayer back={this.back} percent={this.percent()} onPercentChange={this.onPercentChange} /> }
				{ isFullScreen === false && <MiniPlayer open={this.open} /> }
				<audio
					controls
					autoPlay
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
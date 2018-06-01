import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

const BTN_WIDTH = 16

class ProgressBar extends React.PureComponent {
    constructor(props) {
		super(props);
		this.touch = {}
	}

	componentDidUpdate(prevProps, prevState) {
		this._percent(this.props.percent)
	}

	progressClick = (e) => {
		e.stopPropagation()
		let rectLeft = this.progressBarRef.getBoundingClientRect().left
		let offsetWidth = e.pageX - rectLeft
		this._move(offsetWidth)
		this._percentChange()
	}
	
	onProgressTouchStart = (e) => {
		e.preventDefault()
		this.touch.init = true
		this.touch.startX = e.touches[0].pageX
		this.touch.left = this.progressRef.clientWidth
	}
	
	onProgressTouchMove = (e) => {
		e.preventDefault()
		if (!this.touch.init) {
			return
		}
		let deltaX = e.touches[0].pageX - this.touch.startX
		let offsetWidth = Math.min(this.progressBarRef.clientWidth - BTN_WIDTH, Math.max(0, this.touch.left + deltaX))
		this._move(offsetWidth)
	}
	
	onProgressTouchEnd = (e) => {
		this.touch.init = false
		this._percentChange()
	}

	_percent(newVal) {
		if (newVal >= 0 && !this.touch.init) {
			let barWidth = this.progressRef.clientWidth - BTN_WIDTH
			let offsetWidth = newVal * barWidth
			this._move(offsetWidth)
		}
	}

	_move(offsetWidth) {
		this.progressRef.style.width = `${offsetWidth}px`
		this.btnRef.style['webkitTransform'] = `translate3d(${offsetWidth}px, 0, 0)`
		this.btnRef.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`
	}

	_percentChange() {
		let barWidth = this.progressBarRef.clientWidth - BTN_WIDTH
		let newPercent = this.progressRef.clientWidth / barWidth
		this.props.onPercentChange(newPercent);
	}

	render() {
		return(
			<div className="progress-bar" 
				ref={(progressBarRef) => { this.progressBarRef = progressBarRef; }} 
				onClick={this.progressClick}>
				<div className="progress-bar-container">
					<div className="progress-bar-inner">
						<div className="progress" ref={(progressRef) => { this.progressRef = progressRef; }} ></div>
						<div className="progress-btn-wrapper" 
							ref={(btnRef) => { this.btnRef = btnRef; }}
							onTouchStart={this.onProgressTouchStart}
							onTouchMove={this.onProgressTouchMove}
							onTouchEnd={this.onProgressTouchEnd}
							>
							<div className="progress-btn"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


ProgressBar.propTypes = {
	percent: PropTypes.number,
	onPercentChange: PropTypes.func,
};

ProgressBar.defaultProps = {
    percent: 0,
};

export default ProgressBar
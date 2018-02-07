import React from 'react';
import PropTypes from 'prop-types';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';

class Player extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
			fullScreen: false,
        };
	}
	
	render() {
		const { fullScreen } = this.state; 
		return(
			<div className="player">
				{ fullScreen && <NormalPlayer /> }
				{ fullScreen === false && <MiniPlayer /> }
			</div>
		)
	}

}

Player.propTypes = {
};

// Specifies the default values for props:
Player.defaultProps = {
};

export default Player;
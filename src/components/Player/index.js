import React from 'react';
import PropTypes from 'prop-types';
import NormalPlayer from './NormalPlayer';
import MiniPlayer from './MiniPlayer';

class Player extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
			fullScreen: false,
        };
	}
	
	render() {
		return(
			<div className="player">
				<NormalPlayer />
				<MiniPlayer />
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
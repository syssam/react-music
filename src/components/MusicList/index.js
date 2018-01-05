import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const MusicList = (props) => {
    const { data } = props;

    return (
        <div className="music-list">
            <ul>
                {data.map((item, index) =>
                    <li className="item" key={item.id}>
                        <div className="content">
                            <h2 className="name">{item.name}</h2>
                            <p className="desc">{item.desc}</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

MusicList.propTypes = {
    data: PropTypes.array
};

// Specifies the default values for props:
MusicList.defaultProps = {
    data: [],
};


export default MusicList;

import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import './spin.css';

const Spin = ({title}) => {
    return (
        <div className="spin">
            <Icon type='spinner' />
            { title && <div className="text">{title}</div> }
        </div>
    );
}

Spin.propTypes = {
    title: PropTypes.string
};

Spin.defaultProps = {
    title: '玩命加载中...',
};

export default Spin;
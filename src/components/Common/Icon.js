import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/plugin/font-awesome-4.7.0/css/font-awesome.css';

const Icon = ({ type, size }) => {
    let className = "icon fa fa-" + type;

    if(size) {
        className += ' fa-' + size;
    }

    return (
        <i className={className} aria-hidden="true"></i>
    );
}

Icon.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string
};

export default Icon;
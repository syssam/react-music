import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/plugin/fontawesome-free-5.0.13/css/fontawesome-all.css';

const Icon = ({ type, size, style }) => {
    if(!style) {
        style = 's';
    }

    let className = "icon fa" + style + " fa-" + type;

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
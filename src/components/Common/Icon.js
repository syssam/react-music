import React from 'react';
import '../../assets/plugin/font-awesome-4.7.0/css/font-awesome.css';

const Icon = (props) => {
    const { type, size } = props;
    let className = "fa fa-" + type;

    if(size) {
        className += ' fa-' + size;
    }

    return (
        <i className={className} aria-hidden="true"></i>
    );
}

export default Icon;
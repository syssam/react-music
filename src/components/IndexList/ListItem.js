import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

const ListItem = ({item}) => {
    return (
        <div
            className="index-list-item">
            {item.name}
        </div>
    );
}

ListItem.propTypes = {
    item: PropTypes.object
};

// Specifies the default values for props:
ListItem.defaultProps = {
    item: {},
};


export default ListItem;
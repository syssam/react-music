import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

const ListItem = ({ item, index, renderItem, onClickItem }) => {
    const handleClick = onClickItem ? () => onClickItem(item, index) : undefined;
    return (
        <li
            onClick={handleClick}
            className="index-list-item">
            { renderItem ? renderItem(item, index) : item.name }
        </li>
    );
}

ListItem.propTypes = {
    item: PropTypes.object
};

// Specifies the default values for props:
ListItem.defaultProps = {
    item: {}
};


export default ListItem;
import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

const ListItem = (props) => {
    const { item, index, renderItem } = props;
    return (
        <div
            className="index-list-item">
            { renderItem ? renderItem(item, index) : item.name }
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
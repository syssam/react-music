import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './ListGroup.css';

const ListGroup = ({group, listGroupRef}) => {
    return (
        <div className="index-list-group" ref={listGroupRef} >
            <h2 className="index-list-anchor">{group.name}</h2>
            <ul>
                {group.items.map((item, index) =>
                    <ListItem
                        item={item}
                        key={index}
                    />
                )}
            </ul>
        </div>
    );
}

ListGroup.propTypes = {
    group: PropTypes.object
};

// Specifies the default values for props:
ListGroup.defaultProps = {
    group: {},
};


export default ListGroup;
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './ListGroup.css';

const ListGroup = (props) => {
    const { group, listGroupRef, onClickItem, renderItem } = props;

    return (
        <div className="index-list-group" ref={listGroupRef} >
            <h2 className="index-list-anchor">{group.name}</h2>
            <ul>
                {group.items.map((item, index) =>
                    <ListItem
                        item={item}
                        key={index}
                        index={index}
                        onClick={ onClickItem ? onClickItem(item, index) : null }
                        renderItem={ renderItem ? renderItem : null }
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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ScrollView from '../ScrollView';
import ListGroup from './ListGroup';
import { getData } from '../../utils/dom';
import './index.less';

const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18

class IndexList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            scrollY: -1,
            diff: -1,
            options: {
                probeType: 3
            },
            titleHeight: null
        }

        this.listHeight = []
        this.touch = {}
        this.refIndexList = null;
        this.refListGroup = [];
        this.subTitleHeight = 0
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.data !== nextProps.data) {
            return true;
        }

        if(this.state.currentIndex !== nextState.currentIndex) {
            return true;
        }

        if(nextState.scrollY > -nextState.titleHeight) {
            return true;
        }

        if(this.state.diff !== nextState.diff) {
            return true;
        }

        if(nextProps.title && this.props.title !== nextProps.title) {
            setTimeout(() => {
                this.title(nextProps.title);
            }, 20)
        }
        
        if(this.state.scrollY !== nextState.scrollY) {
            this.scrollY(nextState.scrollY);
        }

        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.data !== prevProps.data) {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        }

        if(this.state.diff !== prevState.diff) {
            this.diff(this.state.diff);
        }
    }

    componentDidMount() {
        this.setState({
            titleHeight: this.title && this.refTitle ? this.refTitle.clientHeight : 0
        });

        this._calculateHeight();
    }

    fixedTitle() {
        const { titleHeight, scrollY, currentIndex } = this.state;

        if (titleHeight === null || scrollY > -titleHeight) {
            return ''
        }

        return this.props.data[currentIndex] ? this.props.data[currentIndex].name : ''
    }

    shortcutList() {
        return this.props.data.map((group) => {
            return group ? group.shortcut || group.name.substr(0, 1) : ''
        })
    }

    onScroll = (pos) => {
        this.setState({
            scrollY: pos.y
        });
    }

    onShortCutTouchStart = (e) => {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
    }

    onShortCutTouchMove = (e) => {
        e.stopPropagation();
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex, 0) + delta
        this._scrollTo(anchorIndex)
    }

    _calculateHeight() {
        const subTitleEl = ReactDOM.findDOMNode(this).querySelector('.index-list-anchor');
        this.subTitleHeight = subTitleEl ? subTitleEl.clientHeight : 0;

        if (!this.refListGroup) {
          return
        }

        this.listHeight = [];
        let height = this.state.titleHeight;
        this.listHeight.push(height)
        for (let i = 0; i < this.refListGroup.length; i++) {
          let item = this.refListGroup[i]
          if(item) {
            height += item.clientHeight
            this.listHeight.push(height)
          }
        }
    }

    _scrollTo(index) {
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.refIndexList.scrollToElement(this.refListGroup[index], 0)
        this.setState({
            scrollY: this.refIndexList.scroll.y
        })
    }

    title(newVal) {
        this.setState({
            titleHeight: newVal && this.refTitle ? this.refTitle.clientHeight : 0
        });
        this._calculateHeight()
    }

    diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < this.subTitleHeight) ? newVal - this.subTitleHeight : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.refFixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }

    scrollY(newY) {
        const listHeight = this.listHeight
        // top
        if (newY > -this.state.titleHeight) {
            this.setState({
                currentIndex: 0
            })
            return
        }
        // midd
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.setState({
                currentIndex: i,
                diff: Math.max(height2 + newY)
            })
            return
          }
        }
        // bottom

        this.setState({
            currentIndex: listHeight.length - 2
        })
    }

    renderList() {
        const { data, onClickItem, renderItem } = this.props;
        return (
            <ul ref={(groups) => { this.refGroups = groups; }}>
                {data.map((group, index) =>
                    <ListGroup 
                        listGroupRef={el => this.refListGroup.push(el)}
                        key={index}
                        group={group}
                        onClickItem={onClickItem}
                        renderItem={renderItem}
                    />
                )}
            </ul>
        )
    }

    renderfixedTitle() {
        if(this.fixedTitle()) {
            return (
                <div className="index-list-fixed" ref={(el) => { this.refFixed = el; }}>
                    {this.fixedTitle()}
                </div>
            )
        }

        return null;
    }

    renderNav() {
        const shortcutList = this.shortcutList();
        const { currentIndex } = this.state;
        return (
            <div className="index-list-nav" onTouchStart={this.onShortCutTouchStart}  onTouchMove={this.onShortCutTouchMove}>
                <ul>
                {shortcutList.map((item, index) =>
                    <li key={index} className={currentIndex === index ? 'active' : ''} data-index={index}>{item}</li>
                )}
                </ul>
            </div>
        )
    }

    render() {
        const { options } = this.state;

        return (
            <div className="index-list-wrapper">
                <div className="index-list">
                    <ScrollView
                        ref={(indexList) => { this.refIndexList = indexList; }}
                        onScroll={this.onScroll}
                        options={options}>
                        {
                            this.props.title &&
                            <h1 className="index-list-title" ref={(el) => { this.refTitle = el; }}>
                                {this.props.title}
                            </h1>
                        }
                        <div 
                            className="index-list-content"
                            ref={(content) => { this.refContent = content; }}>
                            { this.renderList() }
                        </div>
                    </ScrollView>
                    { this.renderNav() }
                    { this.renderfixedTitle() }
                </div>
            </div>
        );
    }
}

IndexList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    onClickItem: PropTypes.func,
    renderItem: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
};

// Specifies the default values for props:
IndexList.defaultProps = {
    title: '',
    data: [],
};

export default IndexList;
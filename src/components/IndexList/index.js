
import React from 'react';
import PropTypes from 'prop-types';
import ScrollView from '../ScrollView';
import ListGroup from './ListGroup';
import './index.less';

const COMPONENT_NAME = 'index-list'

const TITLE_HEIGHT = 50
const SUBTITLE_HEIGHT = 40
const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18

class IndexList extends React.PureComponent {
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

        this.listenScroll = true
        this.listHeight = []
        this.touch = {}
        this.refIndexList = null;
        this.refListGroup = [];
        this.subTitleHeight = 0
    }

    componentDidUpdate(prevProps, prevState) {
        const { scrollY, diff } = this.state;
        const { data } = this.props;

        if(prevProps.data !== data) {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        }

        if(prevState.scrollY !== scrollY) {
            this.scrollY(scrollY);
        }

        if(prevState.diff !== diff) {
            this.diff(diff);
        }
    }

    componentDidMount() {
        this.titleHeight = this.title && this.refTitle ? this.refTitle.height : 0;
        this.subTitleHeight = 40;
        setTimeout(() => {
            this._calculateHeight()
        }, 20)
    }

    fixedTitle = () => {
        if (this.state.scrollY > -TITLE_HEIGHT) {
          return ''
        }

        return this.props.data[this.state.currentIndex] ? this.props.data[this.state.currentIndex].name : ''
    }

    shortcutList() {
        return this.data.map((group) => {
            return group.name.substr(0, 1)
        })
    }

    refresh() {
        this.refIndexList.refresh()
    }

    scroll = (pos) => {
        this.setState({
            scrollY: pos.y
        });
    }

    onShortcutTouchStart(e) {
        /*
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
        */
    }

    onShortcutTouchMove(e) {
        /*
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
        */
    }

    addActiveClass(e) {
        //addClass(e.currentTarget, ACTIVE_CLS)
    }

    removeActiveClass(e) {
        //dremoveClass(e.currentTarget, ACTIVE_CLS)
    }

    _calculateHeight() {
        const list = this.refListGroup;
        if (!list) {
          return
        }

        this.listHeight = [];
        let height = TITLE_HEIGHT
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
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
        if (newY > -TITLE_HEIGHT) {
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
                diff: height2 + newY
            })
            return
          }
        }
        // bottom

        this.setState({
            currentIndex: listHeight.length - 2
        })
    }

    renderList = () => {
        const  { data } = this.props;
        return (
            <ul ref={(groups) => { this.refGroups = groups; }}>
                {data.map((group, index) =>
                    <ListGroup 
                        //ref={(refListGroup) => { this.refListGroup.push(refListGroup); }}
                        listGroupRef={el => this.refListGroup.push(el)}
                        key={index}
                        group={group}
                    />
                )}
            </ul>
        )
    }

    renderfixedTitle = () => {
        if(this.fixedTitle) {
            return (
                <div className="index-list-fixed" ref={(fixed) => { this.refFixed = fixed; }}>
                    {this.fixedTitle()}
                </div>
            )
        }

        return null;
    }

    render() {
        const { options } = this.state;
        return (
            <div className="index-list-wrapper">
                <div className="index-list">
                    <ScrollView
                        ref={(indexList) => { this.refIndexList = indexList; }}
                        listenScroll={this.listenScroll}
                        onScroll={this.scroll}
                        options={options}>
                        {
                            this.props.title &&
                            <h1 class="index-list-title">
                                {this.props.title}
                            </h1>
                        }
                        <div 
                            className="index-list-content"
                            ref={(content) => { this.refContent = content; }}>
                            { this.renderList() }
                        </div>
                    </ScrollView>
                    { this.renderfixedTitle() }
                </div>
            </div>
        );
    }
}

IndexList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};

// Specifies the default values for props:
IndexList.defaultProps = {
    title: '',
    data: [],
};

export default IndexList;
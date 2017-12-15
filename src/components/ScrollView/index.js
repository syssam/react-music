import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './index.css';

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
const DEFAULT_LOAD_TXT_MORE = 'Load more'
const DEFAULT_LOAD_TXT_NO_MORE = 'No more data'
const DEFAULT_REFRESH_TXT = 'Refresh success'

const DEFAULT_OPTIONS = {
    click: true,
    probeType: 1,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false
}

class ScrollView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            beforePullDown: true,
            isRebounding: false,
            isPullingDown: false,
            isPullUpLoad: false,
            pullUpDirty: true,
            bubbleY: 0,
            pullDownStyle: {}
        }

        this.scroll = null;
        this.pullDownInitTop = -50;
    }


    pullUpTxt() {
        const { pullUpLoad } = this.props.options
        const txt = pullUpLoad && pullUpLoad.txt
        const moreTxt = txt && txt.more || DEFAULT_LOAD_TXT_MORE
        const noMoreTxt = txt && txt.noMore || DEFAULT_LOAD_TXT_NO_MORE
        return this.state.pullUpDirty ? moreTxt : noMoreTxt
    }

    refreshTxt() {
        const { pullDownRefresh } = this.props.options
        return pullDownRefresh && pullDownRefresh.txt || DEFAULT_REFRESH_TXT
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.children !== prevProps.children) {
            setTimeout(() => {
                this.forceUpdate(true)
            }, this.props.refreshDelay)
        }
    }

    componentDidMount() {
        this.initScroll();
    }

    componentWillUnmount () {
        this.destroy();
        this.scroll = null;
    }

    initScroll = () => {
        if (!this.scrollWrapper) {
            return
        }

        if (this.props.children && (this.pullDownRefresh || this.pullUpLoad)) {
            this.scrollContainer.style.minHeight = `${this.scrollWrapper.height + 1}px`
        }

        const { options } = this.props;

        let options = Object.assign({}, DEFAULT_OPTIONS, {
            scrollY: this.direction === DIRECTION_V,
            scrollX: this.direction === DIRECTION_H
        }, this.props.options)

        this.scroll = new BScroll(this.scrollWrapper, options);
        this.initScrollEvents();
    }

    initScrollEvents = () => {
        const { onScroll, onBeforeScrollStart, onPullingDown, onPullingUp } = this.props

        if (onScroll) {
            this.scroll.on('scroll', (position) => { onScroll(position) });
        }

        if (onBeforeScrollStart) {
            this.scroll.on('beforeScrollStart', () => { onBeforeScrollStart });
        }

        if (pullDownRefresh) {
            this._initPullDownRefresh();
        }

        if (pullUpLoad) {
            this._initPullUpLoad();
        }
    }

    disable() {
        this.scroll && this.scroll.disable()
    }
    
    enable() {
        this.scroll && this.scroll.enable()
    }
    
    refresh() {
        this.scroll && this.scroll.refresh()
    }

    destroy() {
        this.scroll.destroy()
    }

    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    }
    
    scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

    forceUpdate(dirty) {
        const { pullDownRefresh, pullUpLoad } = this.props;
        const { isPullingDown, isPullUpLoad } = this.state;

        if (pullDownRefresh && isPullingDown) {
            this.setState({
                isPullingDown: false,
            });
            this._reboundPullDown().then(() => {
                this._afterPullDown()
            });
        } else if (pullUpLoad && isPullUpLoad) {
            this.setState({
                isPullUpLoad: false,
            });
            this.scroll.finishPullUp();
            this.setState({
                pullUpDirty: dirty,
            });
            this.refresh();
        } else {
            this.refresh();
        }
    }

    _initPullDownRefresh = () => {
        const { pullDownRefresh } = this.props;
        let { beforePullDown, isRebounding } = this.state;

        this.scroll.on('pullingDown', () => {
            pullDownRefresh();
            this.setState({
                beforePullDown: false,
                isPullingDown: true,
            });

            this._reboundPullDown().then(() => {
                this._afterPullDown();
            })
        });

        this.scroll.on('scroll', (pos) => {
            if (beforePullDown) {
                this.setState({
                    bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
                    pullDownStyle: {
                        top: `${Math.min(pos.y + this.pullDownInitTop, 10)}px`
                    }
                })
            } else {
                this.setState({
                    bubbleY: 0
                })
            }

            if (isRebounding) {
                this.setState({
                    pullDownStyle: {
                        top: `top:${Math.min(pos.y - 30, 10)}px`
                    }
                })
            }
        })
    }

    _initPullUpLoad = () => {
        const { pullUpLoad } = this.props;

        this.scroll.on('pullingUp', () => {
            this.setState({
                isPullUpLoad: false,
            });

            pullUpLoad();
        })
    }

    _reboundPullDown() {
        const { stopTime = 600 } = this.props.pullDownRefresh;

        return new Promise((resolve) => {
            setTimeout(() => {
                this.setState({
                    isRebounding: true,
                })
                this.scroll.finishPullDown();
                this.setState({
                    isPullingDown: false,
                })
                resolve();
            }, stopTime)
        })
    }

    _afterPullDown() {
        setTimeout(() => {
            this.setState({
                pullDownStyle:{
                    top: `${this.pullDownInitTop}px`
                },
                beforePullDown: true,
                isRebounding: false
            });

            this.refresh();
        }, this.scroll.options.bounceTime)
    }

    renderPullUpLoad = () => {
        const { pullUpLoad } = this.props;
        const { isPullUpLoad } = this.state;

        if(pullUpLoad) {
            return (
                <div className="pullup-wrapper">
                    { !isPullUpLoad ?
                    <div className="before-trigger">
                         <span>{this.pullUpTxt}</span>
                    </div>
                    :
                    <div className="after-trigger">
                        Loading
                    </div> }
                </div>
            )
        }
    }

    renderPullDown = () => {
        const { pullDownRefresh } = this.props;
        const { pullDownStyle, beforePullDown, isPullingDown, bubbleY } = this.state;

        if(pullDownRefresh) {
            return (
                <div ref="pulldown" className="pulldown-wrapper" style={pullDownStyle}>
                    { beforePullDown ?
                    <div className="before-trigger">
                        bubble
                    </div>
                    :
                    <div className="after-trigger">
                        {isPullingDown ?
                        <div className="loading">
                            Loading
                        </div>
                        :
                        <div><span>refreshTxt</span></div>
                        }
                    </div>
                    }
                </div>
            )
        }
    }

    render() {
        return (
            <div ref={(wrapper) => { this.scrollWrapper = wrapper; }} className="scroll-wrapper">
                <div ref={(container) => { this.scrollContainer = container; }} className="scroll-container">
                    <div className="scroll-inner-container">{this.props.children}</div>
                    { this.renderPullUpLoad() }
                </div>
                { this.renderPullDown() }
            </div>
        );
    }
}

ScrollView.propTypes = {
    options: PropTypes.object,
    listenScroll: PropTypes.bool,
    listenBeforeScroll: PropTypes.bool,
    direction: PropTypes.oneOf([DIRECTION_H, DIRECTION_V]),
    refreshDelay: PropTypes.number,
    onPullingUp: PropTypes.func,
};

// Specifies the default values for props:
ScrollView.defaultProps = {
    options: {},
    listenScroll: false,
    listenBeforeScroll: false,
    direction: DIRECTION_V,
    refreshDelay: 20,
};

export default ScrollView;
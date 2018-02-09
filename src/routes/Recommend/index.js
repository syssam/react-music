import React, { Component } from 'react';
import ScrollView from '../../components/ScrollView';
import { Carousel } from 'antd';
import jsonp from '../../utils/jsonp';
import './index.css';

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliders: [],
            recommends: []
        };
    }

    componentDidMount() {
        this.getSlider(); 
        this.getRecommend();
    }

    getSlider = async () => {
        let response = await jsonp('http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?inCharset=utf-8&outCharset=utf-8&format=jsonp', {name: 'SliderJsonCallback'});
        this.setState({
            sliders: response.data.slider
        });
    }

    getRecommend = async() => {
        let response = await jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg?format=jsonp&inCharset=utf8&outCharset=utf-8&data={%22recomPlaylist%22:{%22method%22:%22get_hot_recommend%22,%22param%22:{%22async%22:1,%22cmd%22:2},%22module%22:%22playlist.HotRecommendServer%22}}', {param: 'callback', name: 'RecommendJsonCallback'});
        this.setState({
            recommends: response.recomPlaylist.data.v_hot
        });
    }

    render() {
        const { sliders, recommends } = this.state;
        return(
            <div className="recommend">
                {sliders.length && recommends.length &&
                <ScrollView>
                    <Carousel autoplay speed={1000}>
                        {sliders.map((slider, index) => (
                            <a href={slider.linkUrl} key={slider.id} target="_blank">
                                <img alt="" src={slider.picUrl} />
                            </a>
                        ))}
                    </Carousel>
                    <section className="recommend-list">
                        <h3 className="list-title">热门歌单推荐</h3>
                        <ul>
                            {recommends.map((recommend, index) => (
                                <li className="list-item" key={recommend.content_id}>
                                    <div className="image"><img alt={recommend.title} src={recommend.cover} /></div>
                                    <div className="content">
                                        <h5 className="title">{recommend.title}</h5>
                                        <p className="description">{recommend.rcmdcontent}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </ScrollView>}
            </div>
        )
    }
}

export default Recommend;
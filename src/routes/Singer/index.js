import React, { Component } from 'react';
import { Avatar } from 'antd';
import ScrollView from '../../components/ScrollView';
import jsonp from '../../utils/jsonp';
import './index.css';

const listTitle = {
    popular: '热门'
}

class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
        this.cacheData = [];
    }

    componentDidMount() {
        this.getSingers(); 
    }

    getSingers = async () => {
        let response = await jsonp('https://c.y.qq.com/v8/fcg-bin/v8.fcg?inCharset=utf-8&outCharset=utf-8&format=jsonp&channel=singer&page=list&key=all_all_all&pagenum=1', {name: 'SingerJsonCallback'});
        this.cacheData = response.data.list;
        this.setList(this.cacheData);
    }

    setList = (singers) => {
        let list = {};
        list['popular'] = [];
        list['#'] = [];

        singers.forEach(function(singer) {
            if(singer.Farea > 0 && list['popular'].length < 9) {
                list['popular'].push(singer);
            }

            if(!isNaN(singer.Findex)) {
                list['#'].push(singer);
            } else {
                if(!list[singer.Findex]) {
                    list[singer.Findex] = [];
                }
                list[singer.Findex].push(singer);
            }
        });

        list = Object.entries(list).sort(function(a, b) {
            var nameA = a[0].toUpperCase();
            var nameB = b[0].toUpperCase();
            
            if(nameB === 'POPULAR' || nameA === '#') {
                return 1;
            } else if(nameA === 'POPULAR' || nameB === '#') {
                return -1;
            }
            
            if (nameA < nameB) {
              return -1;
            }

            if (nameA > nameB) {
              return 1;
            }
          
            return 0;
        });

        this.setState({ list: list });
    }

    renderList = (data) => {
        if(data) {
            const html = 
            <ul>
                {data.map((listGroup, index) => 
                    <li className="list-group" key={listGroup[0]}>
                        <h3 className="list-group-title">{listTitle[listGroup[0]] ? listTitle[listGroup[0]] : listGroup[0]}</h3>
                        { this.renderListGroupItem(listGroup[1]) }
                    </li>
                )}
            </ul>
            return html;
        }
    }

    renderListGroupItem = (data) => {
        if(data) {
            const html = 
            <ul>
                {data.map((listGroupItem, index) => 
                <li className="list-group-item" key={listGroupItem.Fsinger_id}>
                    <Avatar size="large" src={'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + listGroupItem.Fsinger_mid + '.jpg?max_age=2592000'} />
                    <span className="name">{listGroupItem.Fsinger_name}</span>
                </li>
                )}
            </ul>
            return html;
        }
    }

    handleScroll = (position) => {
    }

    onPullingDown = () => {
        console.log('onPullingDown');
    }

    onPullingUp = () => {
        return new Promise((resolve) => {
            resolve();
        })
    }

    render() {
        const { list } = this.state;

        return(
            <div>
                <section className="singer-list">
                    {list &&
                    <div className="list-view">
                        <ScrollView 
                            onScroll={this.handleScroll}
                            pullDownRefresh={true}
                            pullUpLoad={true}
                            onPullingDown={this.onPullingDown}
                            onPullingUp={this.onPullingUp}
                        >
                            { this.renderList(list) }
                            <div className="list-shortcut"></div>
                            <div className="list-fixed"></div>
                        </ScrollView>
                    </div>}
                </section>
            </div>
        )
    }
}

export default Singer;
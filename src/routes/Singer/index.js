import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IndexList from '../../components/IndexList';
import jsonp from '../../utils/jsonp';
import './index.css';

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

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
        let hot = {
            name: HOT_NAME,
            items: [],
        };

        let hash = {
            name: '#',
            items: [],
        };

        let list = {
            hot: hot
        };

        singers.forEach(function(singer) {
            if(singer.Farea > 0 && list.hot.items.length < HOT_SINGER_LEN) {
                list.hot.items.push({
                    id: singer.Fsinger_mid,
                    name: singer.Fsinger_name,
                    avatar: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.Fsinger_mid}.jpg?max_age=2592000`
                });
            }

            if(!isNaN(singer.Findex)) {
                hash.items.push({
                    id: singer.Fsinger_mid,
                    name: singer.Fsinger_name,
                    avatar: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.Fsinger_mid}.jpg?max_age=2592000`
                });
            } else {
                if(!list[singer.Findex]) {
                    list[singer.Findex] = {
                        name: singer.Findex,
                        items: [],
                    };
                }
                list[singer.Findex].items.push({
                    id: singer.Fsinger_mid,
                    name: singer.Fsinger_name,
                    avatar: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.Fsinger_mid}.jpg?max_age=2592000`
                });
            }
        });

        list['#'] = hash;

        let ret = [];

        Object.entries(list).map((item, index) => ret.push(item[1]));

        ret.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if(nameA === HOT_NAME || nameB === '#') {
                return -1;
            } else if(nameA === '#') {
                return 1;
            }

            return nameA.charCodeAt(0) - nameB.charCodeAt(0);
        });

        this.setState({ list: ret });
    }

    renderItem = (item, index) => {
        return (
            <div>
                <img alt={item.name} className="avatar" src={item.avatar} />
                <span className="name">{item.name}</span>
            </div>
        )
    }

    onClickItem = (item, index) => {
        this.props.history.push({
            pathname: `/singer/${item.id}`,
            state: {
                id: item.id,
                name: item.name,
            }
        })
    }
    
    render() {
        const { list } = this.state;

        return(
            <div>
                <section className="singer-list">
                    {list &&
                    <IndexList 
                        data={list}
                        renderItem={this.renderItem}
                        onClickItem={this.onClickItem}
                    />}
                </section>
            </div>
        )
    }
}

export default withRouter(Singer);
import React, { Component } from 'react';
import { Avatar } from 'antd';
import ListView from '../../components/ListView';
import jsonp from '../../utils/jsonp';
import './index.css';

import singerData from './singer.json';

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
        this.setState({
            list: singerData
        });
        //this.getSingers(); 
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

    render() {
        const { list } = this.state;

        return(
            <div>
                <section className="singer-list">
                    {list &&
                    <ListView 
                        data={list}
                    />}
                </section>
            </div>
        )
    }
}

export default Singer;
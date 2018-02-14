//export const REQUEST_INTL = 'REQUEST_INTL'
//export const RECEIVE_INTL = 'RECEIVE_INTL'
export const PLAY_MODE_RANDOM = 1;
export const PLAY_MODE_ORDER = 2;
export const PLAY_MODE_REPEAT = 3;
export const ADD_TO_PALYLIST = 'ADD_TO_PALYLIST'
export const DELETE_FROM_PALYLIST = 'DELETE_FROM_PALYLIST'
export const CLEAR_PLAY_LIST = 'CLEAR_PLAY_LIST'
export const SET_PLAY_MODE = 'SET_PLAY_MODE'

/*
export function setIntl(locale) {
    return (dispatch, getState) => {
        return dispatch(fetchIntl(locale))
    }
}

function requestIntl(locale) {
    return {
        type: REQUEST_INTL,
        locale
    }
}
*/

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const addToPlayList = song => (dispatch, getState) => {
    let playList = getState().player.playList;
    let currentIndex = getState().player.currentIndex;
    let playListIndex = findIndex(playList, song);

    currentIndex++;
    playList.splice(currentIndex, 0, song)

    if(playListIndex > -1) {
        if (currentIndex > playListIndex) {
            playList.splice(playListIndex, 1)
            currentIndex--
        } else {
            playList.splice(playListIndex + 1, 1)
        }
    }

    dispatch({
        type: ADD_TO_PALYLIST,
        playList: playList,
        isPlaying: true,
        currentIndex: currentIndex
    }) 
}

export const deleteFromPlayList = songID => (dispatch, getState) => {
    let playList = getState().player.playList;
    let currentIndex = getState().player.currentIndex;
    let playListIndex = findIndex(playList, songID);
    playList.splice(playListIndex, 1);

    if (currentIndex > playListIndex || currentIndex === playList.length) {
        currentIndex--
    }

    let isPlaying = playList.length > 0;
    
    dispatch({
        type: DELETE_FROM_PALYLIST,
        playList: playList,
        isPlaying: isPlaying,
        currentIndex: currentIndex
    }) 
}

export const clearPlayList = () => ({
    type: CLEAR_PLAY_LIST
})

/*
function receiveIntl(locale, json) {
    let messages = [];
    messages[locale] = json;
    return {
        type: RECEIVE_INTL,
        locale,
        messages: messages
    }
}

function fetchIntl(locale) {
    return (dispatch) => {
        dispatch(requestIntl(locale))
        let json = {
            "locale": "zh",
            "Hello World": "你好"
        };
        return dispatch(receiveIntl(locale, json))
        /*        
        return fetch(`http://localhost/shop-ket-admin/public/${locale}.json`)
        .then(response => response.json())
        .then(json => dispatch(receiveIntl(locale, json)))
        */
        /*
    }
}
*/
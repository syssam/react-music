import { PLAY_MODE_RANDOM, PLAY_MODE_ORDER, PLAY_MODE_REPEAT, ADD_TO_PALYLIST, DELETE_FROM_PALYLIST, CLEAR_PLAY_LIST } from '../actions/player';

const initialState = {
    Mode: PLAY_MODE_RANDOM,
    isPlaying: false,
    playList: [],
    currentIndex: -1
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_PALYLIST:
            return Object.assign({}, state, {
                playList: action.playList,
                isPlaying: true,
                currentIndex: action.currentIndex
            })
        case DELETE_FROM_PALYLIST:
            return Object.assign({}, state, {
                playList: action.playList,
                isPlaying: action.isPlaying,
                currentIndex: action.currentIndex
            })
        case CLEAR_PLAY_LIST:
            return Object.assign({}, state, {
                playList: [],
                isPlaying: false,
                currentIndex: -1
            })
        default:
        return state
    }
}

export default player
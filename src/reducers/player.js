import {
    SET_PLAY_LIST,
    SET_PLAY_STATUS,
    SET_PLAY_MODE,
    SET_SCREEN_MODE,
    SET_CURRENT_SONG,
    PLAY_MODE_RANDOM,
    SCREEN_MODE_MINI,
    ADD_TO_PALYLIST,
    DELETE_FROM_PALYLIST,
    CLEAR_PLAY_LIST
} from '../actions/player';

const initialState = {
    mode: PLAY_MODE_RANDOM,
    isPlaying: false,
    playList: [],
    currentIndex: -1,
    screenMode: SCREEN_MODE_MINI
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAY_LIST:
            return {
                ...state,
                playList: action.playList
            }
        case SET_PLAY_STATUS:
            return {
                ...state,
                isPlaying: true,
            }
        case SET_PLAY_MODE:
            return {
                ...state,
                mode: action.mode,
            }
        case SET_SCREEN_MODE:
            return {
                ...state,
                screenMode: action.screenMode,
            }
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentIndex: action.currentIndex
            }
        case ADD_TO_PALYLIST:
            return {
                ...state,
                playList: action.playList,
                currentIndex: action.currentIndex
            }
        case DELETE_FROM_PALYLIST:
            return {
                ...state,
                playList: action.playList,
                isPlaying: action.isPlaying,
                currentIndex: action.currentIndex
            }
        case CLEAR_PLAY_LIST:
            return {
                ...state,
                playList: [],
                isPlaying: false,
                currentIndex: -1
            }
        default:
            return state
    }
}

export default player
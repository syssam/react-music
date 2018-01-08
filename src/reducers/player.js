import { REQUEST_INTL, RECEIVE_INTL } from '../actions/player';

const initialState = {
    locale: 'en',
    messages: [],
    isFetching: false,
}

const intl = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_INTL:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_INTL:
            return Object.assign({}, state, {
                locale: action.locale,
                messages: action.messages,
                isFetching: false,
            })
        default:
        return state
    }
}

export default intl
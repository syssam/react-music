export const REQUEST_INTL = 'REQUEST_INTL'
export const RECEIVE_INTL = 'RECEIVE_INTL'

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
    }
}
import originJsonp from 'jsonp';

export default function jsonp(url, options) {
    const defaultOptions = {
        param: 'jsonpCallback',
        prefix: '',
        name: 'jsonp'
    }

    let newOptions = Object.assign(defaultOptions, options);

    return new Promise(function(resolve, reject) {
        originJsonp(url, newOptions, function (error, data) {
            if(!error) {
                resolve(data);
            } else {
                reject(new Error(error));
            }
        });
    });
}
'use strict';

const {endsWith} = require('lodash');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');


const buildRequest = (url, fetchOptions) => {
    console.log('coming into buildRequest')
    return new fetch.Request(url, fetchOptions);
};

const retryOptions = () => {
    return {
        retries: config.utils.api.retries,
        retryDelay: config.utils.api.retryDelay
    };
};

const asyncFetch = (url, fetchOptions, parseBody) => {
    console.log('coming into asyncFetch')
    if (!endsWith(url, 'health')) {
       // logger.info('Calling external service');
    }

    return new Promise((resolve, reject) => {
        console.log('coming into Promise')
        const asyncReq = buildRequest(url, fetchOptions);
        console.log(asyncReq)
        fetch(asyncReq, retryOptions())
            .then(res => {
                if (!endsWith(url, 'health')) {
                  //  logger.info(`Status: ${res.status}`);
                }
                if (res.ok) {
                    console.log('coming into res.ok')
                    return parseBody(res);
                }
                //logger.error(res.statusText);
                return parseBody(res)
                console.log('coming into parseBody')
                    .then(body => {
                      //  logger.error(body);
                        reject(new Error(res.statusText));
                    });

            })
            .then(body => {
                resolve(body);
            })
            .catch(err => {
               // logger.error(`Error${err}`);
                reject(Error(err));
            });
    });
};

const fetchJson = (url, fetchOptions) => {
    console.log('coming into fetchJson')
    return asyncFetch(url, fetchOptions, res => res.json())
        .then(json => json)
        .catch(err => err);
};

const fetchText = (url, fetchOptions) => {
    return asyncFetch(url, fetchOptions, res => res.text())
        .then(text => text)
        .catch(err => err);
};

const fetchOptions = (data, method, headers, proxy) => {
    return {
        method: method,
        mode: 'cors',
        redirect: 'follow',
        follow: 10,
        timeout: 10000,
        body: JSON.stringify(data),
        headers: new fetch.Headers(headers),
        agent: proxy ? new HttpsProxyAgent(proxy) : null
    };
};

module.exports = {
    fetchOptions: fetchOptions,
    fetchJson: fetchJson,
    asyncFetch: asyncFetch,
    fetchText: fetchText
};

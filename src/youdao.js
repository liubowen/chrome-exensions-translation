const axios = require('axios').default;
const CryptoJS = require('crypto-js');

const appKey = '528ad0595b157b73';
const key = 'dsy35er1GJ6GjnJLs6Y4wuSHMR0YMjog';
const url = 'https://openapi.youdao.com/api';
const from = 'en';
const to = 'zh-CHS';

function truncate(q) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

function translation(text, cb) {
  const salt = new Date().getTime();
  const curTime = Math.round(new Date().getTime() / 1000);
  const query = text;
  const str = appKey + truncate(query) + salt + curTime + key;
  const sign = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);

  fetch(url, {
    method: 'post',
    body: new URLSearchParams({
      q: query,
      appKey,
      salt,
      from,
      to,
      sign,
      signType: 'v3',
      curtime: curTime,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      cb(res);
    });
}

module.exports = translation;

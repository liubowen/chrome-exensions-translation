const youdao = require('./youdao');

chrome.runtime.onInstalled.addListener(() => {
  console.log('translation start');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  youdao(request, (data) => sendResponse(data));
  return true;
});

const style = document.createElement('style');
style.innerHTML = `
  #translation {
    position: absolute;
    min-width: 100px;
    max-width: 500px;
    min-height: 100px;
    top: 0;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
    background-color: rgb(255, 255, 255);
    z-index: 1201 !important;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: rgb(187, 187, 187) rgb(187, 187, 187) rgb(168, 168, 168);
    padding: 16px;
    display: none;
  }
`;

const div = document.createElement('div');
div.id = 'translation';

document.body.appendChild(style);
document.body.appendChild(div);

document.body.addEventListener('mousedown', async (e) => {
  if (e.path.includes(document.querySelector('#translation')) || document.querySelector('#translation').style.display === 'none') {
    return false;
  }
  document.querySelector('#translation').style.display = 'none';
});

document.body.addEventListener('mouseup', async (e) => {
  if (e.path.includes(document.querySelector('#translation'))) {
    return false;
  }
  const top = e.pageY;
  const left = e.pageX;

  const translation = document.querySelector('#translation');

  let text = document.getSelection()?.toString();
  text = text.replace(/(^\s*)|(\s*$)/g, '');

  if (text && /^[a-zA-Z 0-9~!@#$%^&*\-.,\[\]\/\\’]+$/.test(text)) {
    translation.style.top = top + 10 + 'px';
    translation.style.left = left + 10 + 'px';
    translation.style.display = 'block';
    document.querySelector('#translation').innerHTML = 'loading...';

    chrome.runtime.sendMessage(text, (res) => {
      const { query, translation } = res;
      const explains = res.basic?.explains || [];
      const phonetic = res.basic?.phonetic || '';
      const str = `
        <p>${query.length < 50 ? query : ''}${
        phonetic &&
        ` [<a href="javascript:void(0);" onclick="
          var n = new Audio();
          n.src = '${res.speakUrl}';
       　　 n.play();
        ">${phonetic}</a>]`
      }</p>
        ${explains.length > 0 ? explains.map((item) => `<p>${item}</p>`).join('') : `<p>${translation}</p>`}
      `;
      document.querySelector('#translation').innerHTML = str;
    });
  } else {
    translation.style.display = 'none';
  }
});

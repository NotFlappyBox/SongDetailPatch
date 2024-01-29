read = new FileReader;

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const file = event.target.files[0];
  read.readAsText(file);
});

function patch() {
  const data = JSON.parse(read.result);
  const detailIndex = new Map();
  var patchedData = data;
  for (let i in data.items) {
    if (data.items[i].key.startsWith('song_detail_')) {
      detailIndex.set(data.items[i].key, i);
    }
  }
  var checked = [];
  for (let i of data.items) {
    if (i.key != undefined && i.key.startsWith('song_') && !(i.key.startsWith('song_sub_') || i.key.startsWith('song_detail_') || checked.includes(i.key))) {
      let jpName = i.japaneseText;
      let temp = {};
      temp.key = 'song_detail_' + i.key.substring(5);
      temp.japaneseText = '';
      temp.japaneseFontType = 0;
      checked.push(i.key);
      if (jpName != i.englishUsText) {
        temp.englishUsText = jpName;
      } else {
        temp.englishUsText = '';
      }
      temp.englishUsFontType = 0;
      if (jpName != i.chineseTText) {
        temp.chineseTText = jpName;
      } else {
        temp.chineseTText = '';
      }
      temp.chineseTFontType = 0;
      if (jpName != i.koreanText) {
        temp.koreanText = jpName;
      } else {
        temp.koreanText = '';
      }
      temp.koreanFontType = 0;
      if (jpName != i.chineseSText) {
        temp.chineseSText = jpName;
      } else {
        temp.chineseSText = '';
      }
      temp.chineseSFontType = 0;
      if (detailIndex.has('song_detail_' + i.key.substring(5))) {
        patchedData.items[detailIndex.get('song_detail_' + i.key.substring(5))] = temp;
      }
    }
  }
  downloadObjectAsJson(patchedData, 'wordlist')
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
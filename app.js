var fs = require('fs');
var chars = [];
var replacers = [];


async function app() {
  Log('app', 'ready');

  const startTime = Date.now();
  Log('config', 'loading');

  readConfig().then(res => {
    chars = res[0].split('');
    replacers = res[1].split('');

    if (chars.length !== replacers.length) {
      throw new console.error('Invalid config. Character sets are not equal!');
    }

    Log('config', 'ok');
    Log('dir', 'scanning');

    getFileList().then(res => {
      Log('dir', 'scan ready');
      const files = res.payload;
      Log('files', `${files.length} file(s) found`);

      const promises = [];
      Log('promises', 'preparing');
      for (let file of files) {
        promises.push(correctFile(file));
      }
      Log('promises', 'ready');

      Promise.all(promises).then((values) => {
        Log('app', 'done');
        Log('time', `${(Date.now() - startTime) / 1000}s`);
      });

    });
  });
}


function readConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile('config.txt', 'utf8', (err, data) => {
      if (err) throw new console.error('Error when reading config.');
      resolve(data.trim().split(/\r?\n/));
    });
  });
}


function getFileList() {
  return new Promise((resolve, reject) => {
    fs.readdir('./', (err, files) => {
      if (err) throw new console.error('Error when getting file list');

      let textfiles = files.filter(filename => filename.includes('.txt') && filename !== 'config.txt');

      resolve({
        success: true,
        payload: textfiles
      });
    });
  });
}


function correctFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) throw new console.error('Error when correcting file ', filename);

      corrected = data.toString();

      for (let i = 0, max = chars.length; i < max; i++) {
        corrected = corrected.replace(new RegExp(chars[i], 'g'), replacers[i]);
      }

      fs.writeFile(filename, corrected, (err) => {
        if (err) throw new console.error('Error when saving file ', filename);
        resolve(filename + ' has been corrected!');
      });
    });
  });
}

function Log(resource, status) {

  for (let i = resource.length; i < 10; i++) {
    resource += ' ';
  }

  console.log(resource.toUpperCase(), status);

}


app();

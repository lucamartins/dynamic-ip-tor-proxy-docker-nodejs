// const https = require('https');
// const { SocksProxyAgent } = require('socks-proxy-agent');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
// const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

// async function run() {
//   return new Promise((resolve, reject) => {
//     exec('docker restart brave_rosalind', (err, stdout) => {
//       if (err) throw err;

//       setTimeout(() => {
//         https.get('https://ifconfig.me', { agent }, (res) => {
//           res.pipe(process.stdout);
//           resolve();
//         });
//       }, 2000);
//     });
//   })
// }

// async function runCode() {
//   while (true) {
//     await run();
//   }
// }
// runCode();

const https = require('https');
const { SocksProxyAgent } = require('socks-proxy-agent');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

const { Builder, By, Key, until } = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');

async function example() {
  const options = new chrome.Options().addArguments('--proxy-server=socks5://127.0.0.1:9050')

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  try {
    await driver.get('https://www.google.com');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  finally {
    console.log('Finally...')
  }
};


async function run() {
  return new Promise((resolve, reject) => {
    exec('docker restart brave_rosalind', (err, stdout) => {
      if (err) throw err;

      setTimeout(() => {
        example();
      }, 2000);
    });
  })
}

async function runCode() {
  while (true) {
    await run();
  }
}
runCode();

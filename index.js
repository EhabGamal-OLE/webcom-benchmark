const commander = require('commander');
const objPath = require('object-path');
const config = require('config');
const Webcom = require('webcom-as-promised');

const helpers = require('./lib/helpers');

commander
  .option('-r, --requests-num <n>', 'Number of requests - default 10', parseInt, 10)
  .option('-l, --logs-freq <n>', 'Frequency of printing logs - default 1', (v) => parseInt(v), 1)
  .parse(process.argv);

const {
  baseUrl,
  database,
  saveDirectory,
  saveAccount
} = config.get('webcom');

const { requestsNum, logsFreq } = commander;
let done = 0;

var webcomRef = new Webcom(`${baseUrl}/${database}`);

webcomRef
  .authWithPassword(saveAccount)
  .then(() => {
    console.log(`${helpers.stamp()}: Start generating ${requestsNum} random contacts`);
    let contacts = {};
    let dialList = [];
    for (let i = 0; i < requestsNum; i++) {
      const contact = helpers.getRandomInstance();
      const dialPath = helpers.getDialPath(contact.dial);
      dialList.push(dialPath);
      objPath.set(contacts, dialPath.split('/'), contact);
    }
    console.log(`${helpers.stamp()}: Done generating ${requestsNum} random contacts`);
    return [contacts, dialList];
  })
  .then(([contacts, dialList]) => Promise.all([dialList, webcomRef.child(saveDirectory).updateAsync(contacts)]))
  .then(([dialList]) => {
    console.log(`${helpers.stamp()}: Done pushing contacts bulk`);
    console.log(`${helpers.stamp()}: Start reading contacts list`);
    return Promise.all(dialList.map((dial) => {
      return webcomRef
      .child(`${saveDirectory}/${dial}`)
      .valueAsync()
      .then((v) => v.val().dial)
      .then((dial) => {
        if((++done % logsFreq)) return;
        console.log(`${helpers.stamp()}: [${done}/${requestsNum}] Done reading ${dial}`);
      })
    }))
  })
  .then(() => {
    console.log(`${helpers.stamp()}: Done reading ${requestsNum} values from webcom`);
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  })


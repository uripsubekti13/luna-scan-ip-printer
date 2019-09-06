const evilscan = require('evilscan');

const scan = (deviceIp) => {
  const arrDevIP = deviceIp.split('.');
  const subnet = arrDevIP[2];
  const subnetMinusOne = (parseInt(subnet) === 0) ? 0 : (parseInt(subnet) - 1);
  const subnetPlusOne = (parseInt(subnet) === 225 ) ? 225 : (parseInt(subnet) + 1);
  const startIP = arrDevIP[0] + '.' + arrDevIP[1] + '.' + subnetMinusOne.toString() + '.1'; 
  const endIP = arrDevIP[0] + '.' + arrDevIP[1] + '.' + subnetPlusOne.toString() + '.225'; 

  return new Promise(resolve => {
    let ips = [];
    let options = {
      target: `${startIP}-${endIP}`,
      port: '9100',
      status: 'O',
      timeout: 3000,
      banner: true
    };
    console.log(options);
    let scanner = new evilscan(options);
    scanner.on('result', function(data) {
      if (data && data.status === 'open') {
        ips.push(data.ip);
      }
    });
    scanner.on('error', function(err) {
      resolve(ips);
    });
    scanner.on('done', function() {
      resolve(ips);
    });
    scanner.run();
  });
};


module.exports = {
    scan
}

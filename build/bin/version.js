var fs = require('fs');
var path = require('path');
/* console.log('process.env');
console.log(process.env);
console.log(process.env.VERSION); */
var version = process.env.VERSION || require('../../package.json').version;
var content = { '0.0.1': '0.0.1'};
if (!content[version]) content[version] = version;
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));

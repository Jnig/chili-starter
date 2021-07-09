require('source-map-support/register');
require('tsconfig-paths').register({
  baseUrl: '.',
  paths: {
    '~/*': ['./dist/*'],
  },
});

import {server} from './app'
import './routes'

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = require('fs');
const path = require('path');
const createCert = require('create-cert');
const dotenv = require('dotenv');

dotenv.config();

const domain = process.env.DOMAIN;
const certPath = process.env.CERT_PATH;

const buildDir = path.join(__dirname, '../', certPath);
const rootCAFile = path.join(buildDir, 'rootCA.crt');
const keyFile = path.join(buildDir, `${domain}.key`);
const certFile = path.join(buildDir, `${domain}.crt`);

if (fs.existsSync(rootCAFile) && fs.existsSync(certFile)) process.exit(0);

createCert(domain)
  .then(
    (keys) => {
      fs.writeFileSync(rootCAFile, keys.caCert);
      fs.writeFileSync(keyFile, keys.key);
      fs.writeFileSync(certFile, keys.cert);
    },
  )
  .then(() => process.exit(0));

// @ts-nocheck
const { generateService } = require('openapi2ts');
const path = require('path');
const del = require('del');

const pathPrefix = 'src/api/';

function buildAPI() {
  del.sync('./src/api/*');

  generateService({
    requestLibPath: '@/shared/utils/request',
    serversPath: path.resolve(process.cwd(), `${pathPrefix}`),
    projectName: 'Gz',
    schemaPath: 'http://8.137.111.235:8088/pipe/pile/v3/api-docs/admin',
    // templates: path.resolve(process.cwd(), './api-templates'),
    namespace: 'Gz',
    // mockFolder: 'tmpMock',
  });
}

buildAPI();

import listReportsHandler from '../handlers/list_reports/index.mjs';

export default [
  {
    method: 'GET',
    path: '/api/reports',
    handler: listReportsHandler,
  },
];

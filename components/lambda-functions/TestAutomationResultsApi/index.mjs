import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
import httpSecurityHeaders from '@middy/http-security-headers';
import httpErrorHandler from '@middy/http-error-handler';
import httpRouterHandler from '@middy/http-router';

import validationErrorHandler from './middlewares/validation-error-handler/index.mjs';
import routes from './routes/index.mjs';

export const handler = middy()
  .use(httpEventNormalizer())
  .use(httpUrlEncodePathParser())
  .use(httpSecurityHeaders())
  .use(validationErrorHandler())
  .use(httpErrorHandler())
  .handler(httpRouterHandler(routes));

process.on('SIGTERM', async () => {
  console.info('[runtime] SIGTERM received');

  // perform actual clean up work here.

  console.info('[runtime] exiting');
  process.exit(0);
});

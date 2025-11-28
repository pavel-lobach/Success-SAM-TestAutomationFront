import middy from '@middy/core';
import createError from 'http-errors';

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client();

export default middy()
  .handler(async (event, context) => {
    console.log('Requesting list of the requests.');

    try {
      const listObjectResponse = await s3.send(
        new ListObjectsV2Command({
          Bucket: process.env.BUCKET_NAME,
          Prefix: 'runs/',
        }),
      );

      const items = await Promise.all(
        (listObjectResponse.Contents || [])
          .sort((a, b) => b.LastModified - a.LastModified)
          .map(async (item) => {
            const resp = await s3.send(new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: item.Key }));
            return {
              Key: item.Key,
              LastModified: item.LastModified.toISOString(),
              Content: JSON.parse(await resp.Body.transformToString()),
            };
          }),
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          reports: items,
        }),
      };
    } catch (err) {
      throw createError(500, JSON.stringify({ message: err.message }), { expose: true });
    }
  });

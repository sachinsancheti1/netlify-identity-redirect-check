exports.handler = function (event, context, callback) {
  const { identity, user } = context.clientContext;
  callback(null, {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ event, context }),
  });
};

export default () => ({
  onError: (request) => {
    const { error } = request;
    if (error.expose && error.statusCode === 400) {
      request.response = {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message,
          validationErrors: error.cause,
        }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
  },
});

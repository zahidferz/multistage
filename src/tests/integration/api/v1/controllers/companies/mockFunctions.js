/**
 * Returns a mocked dummy reponse for
 * concurrent calls
 * @returns
 */
async function mockDummyResponsePromiseAll() {
  const mockResponse = {
    data: true,
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

export default mockDummyResponsePromiseAll;

const {FusionAuthClient} = require('fusionauth-node-client');
const client = new FusionAuthClient(
    'Qu-jFpvc0V2GeiMcjCmji-A-n7su-wgWVI41vkz3LEau1m7yv3JKw0Cp',
    'http://localhost:9011'
);

// Retrieve User by Email Address
client.retrieveUserByEmail('z.aourzag@gmail.com')
       .then(handleResponse);

function handleResponse (clientResponse) {
  console.info(JSON.stringify(
    clientResponse.successResponse.user, null, 2)
  );
}
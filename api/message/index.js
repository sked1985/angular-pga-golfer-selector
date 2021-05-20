var http = require("https");

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  var body = "";
  var options = {
    host: 'fly.sportsdata.io',
    path: '/golf/v2/json/PlayerSeasonStats/2021',
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': '9a223f53e5de442aa3aca629adae2c5e'
    }
  };

  var response = '';
  const request = http.request(options, (res) => {
    context.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      response += d;
    });

    res.on('end', (d) => {
      context.res = {
        body: response
      };
      context.log('In here with a result')
      context.log(context.res.body)
      context.done();
    })
  })

  request.on('error', (error) => {
    context.log.error(error)
    context.done();
  });

  request.write(body);
  request.end();
};

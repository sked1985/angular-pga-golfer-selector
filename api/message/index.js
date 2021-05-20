var http = require('https');

module.exports = function (context, req) {
    var body = "";
    body += 'grant_type=' + req.query['grant_type'];
    body += '&client_id=' + req.query['client_id'];
    body += '&client_secret=' + req.query['client_secret'];
    body += '&code=' + req.query['code'];

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
        context.log(`statusCode: ${res.statusCode}`)

        res.on('data', (d) => {
            response += d;
        })

        res.on('end', (d) => {
            context.res = {
                body: response
            }
            context.done();
        })
    })

    request.on('error', (error) => {
        context.log.error(error)
        context.done();
    })

    request.write(body);
    request.end();
};


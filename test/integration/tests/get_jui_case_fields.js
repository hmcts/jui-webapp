const { generateAPIRequestForFR } = require('./utils/generateAPI');

suite('API/CASES -> FR case number', function() {
    this.timeout(10000);
    test('GET JUI case column details: (/cases)', () => generateAPIRequestForFR('GET', '/api/cases', {})
        .then(response => {
            response.statusCode.should.be.eql(200);
            response.body.should.have.property('results').which.is.Array();
            // response.body.results[0].case_id.should.be.eql(1536669055006715);
            // var myVar = response.body.results[0].case_id;
            // console.log(myVar);
        }));
});

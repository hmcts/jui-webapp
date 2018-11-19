const { generateAPIRequestForFR } = require('./utils/generateAPI');

suite('API/CASES -> FR cases -> simple GET-s', function() {
    this.timeout(10000);

    // test('GET demo test - error handling ', () => {
    //     return generateAPIRequestForFR('GET', '/blahBlah', {})
    //         .catch(error => {
    //             const response = error.response;
    //             response.statusCode.should.be.eql(404);
    //             response.body.should.not.have.property('meta');
    //         });
    // });

    test('GET JUI cases: (/cases)', () => generateAPIRequestForFR('GET', '/api/cases', {})
        .then(response => {
            response.statusCode.should.be.eql(200);
            response.body.should.have.property('results').which.is.Array();
        }));
});

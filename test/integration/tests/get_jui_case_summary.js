const { generateAPIRequestForFR } = require('./utils/generateAPI');
var url;

suite('API/CASES -> FR case Summary Details', function()  {
    this.timeout(10000);
    test('GET JUI case summary details: (/cases)', () => {
        return generateAPIRequestForFR('GET', '/api/cases', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('columns').which.is.Array();
                var myVar = response.body.results[0].case_id;
                url = '/api/case/DIVORCE/FinancialRemedyMVP2/' + myVar;
                console.log(url);
            });
    });
    test('GET JUI case  details: (/cases)', () => {
        return generateAPIRequestForFR('GET', url, {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('sections').which.is.Array();
                response.body.sections[0].name.should.be.eql('Summary');
            });
    });
});

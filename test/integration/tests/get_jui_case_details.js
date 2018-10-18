
const { generateAPIRequestForFR } = require('./utils/generateAPI');

suite('API/CASES -> FR case columns dashboard', function()  {
    this.timeout(10000);
    test('GET JUI case column details: (/cases)', () => {
        return generateAPIRequestForFR('GET', '/api/cases', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('columns').which.is.Array();
                response.body.columns[0].label.should.be.eql('Case Reference');
                response.body.columns[1].label.should.be.eql('Parties');
                response.body.columns[2].label.should.be.eql('Type');
                response.body.columns[3].label.should.be.eql('Decision needed on');
                response.body.columns[4].label.should.be.eql('Start date');
                response.body.columns[5].label.should.be.eql('Date of last event');
            });
    });
});

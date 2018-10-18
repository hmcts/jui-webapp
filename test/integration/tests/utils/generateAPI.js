const request = require('request-promise');
const should = require('should');
const cookie = '_ga=GA1.1.243496392.1538577618; _gid=GA1.1.2109578968.1538577618; __auth__=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJramtyaWF1ZjBuMjJobjAyMjU2cnRpMDBscCIsInN1YiI6IjEyMzE0MSIsImlhdCI6MTUzOTI1NzcxNiwiZXhwIjoxNTM5Mjg2NTE2LCJkYXRhIjoiY2FzZXdvcmtlci1wcm9iYXRlLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lcixjYXNld29ya2VyLXByb2JhdGUtYXV0aG9yaXNlcixjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQsY2FzZXdvcmtlcixjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLGNhc2V3b3JrZXItc3Njcy1qdWRnZSxjYXNld29ya2VyLHBheW1lbnRzLGNhc2V3b3JrZXItcHJvYmF0ZS1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1hdXRob3Jpc2VyLWxvYTEsY2FzZXdvcmtlci1jbWMtbG9hMSxjYXNld29ya2VyLXNzY3MtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtY291cnRhZG1pbi1sb2ExLGNhc2V3b3JrZXItdGVzdC1sb2ExLGNhc2V3b3JrZXItcmVmZXJlbmNlLWRhdGEtbG9hMSxjYXNld29ya2VyLXNzY3MtY2FsbGFnZW50LWxvYTEsY2FzZXdvcmtlci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1pc3N1ZXItbG9hMSxjYXNld29ya2VyLXNzY3MtanVkZ2UtbG9hMSxjYXNld29ya2VyLWxvYTEscGF5bWVudHMtbG9hMSIsInR5cGUiOiJBQ0NFU1MiLCJpZCI6IjEyMzE0MSIsImZvcmVuYW1lIjoidGVzdEBURVNULkNPTSIsInN1cm5hbWUiOiJ0ZXN0QFRFU1QuQ09NIiwiZGVmYXVsdC1zZXJ2aWNlIjoiQ0NEIiwibG9hIjoxLCJkZWZhdWx0LXVybCI6Imh0dHBzOi8vd3d3LmNjZC5kZW1vLnBsYXRmb3JtLmhtY3RzLm5ldCIsImdyb3VwIjoiY2FzZXdvcmtlciJ9.2822iKDCYTr86RlZoosSTkCdJmtOIeBmMCuv4DRwOKQ; __userid__=123141';
const mainURL = 'http://localhost:3000';
const LOG_REQUEST_ERROR_DETAILS = false;

function generateAPIRequest(method, subURL, params) {
    const options = {
        method,
        url: mainURL + subURL,
        headers: {
            Cookie: cookie,
            'Content-Type': 'application/json'
        },
        json: true,
        resolveWithFullResponse: true
    };

    if (params.body) options.body = params.body;

    const requestPromise = request(options);
    if (LOG_REQUEST_ERROR_DETAILS) {
        requestPromise.catch(error => console.log(error.response.body, 'ERROR !'));
    }
    return requestPromise;
}

function generateAPIRequestForFR(method, subURL, params) {
    return generateAPIRequest(method, subURL, params);
}

module.exports.generateAPIRequestForFR = generateAPIRequestForFR;

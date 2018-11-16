const mockserver = require('json-server');
const path = require('path');

const server = mockserver.create();
const router = mockserver.router(path.join(__dirname, 'mock-data.json'));
const middlewares = mockserver.defaults();


server.use((req, res, next) => {
    console.log('inside mock server.js ...', req);
    next(); // continue to JSON Server router
});

server.use(mockserver.rewriter({
    '/caseworkers/:id/jurisdictions/:jur/case-types/:case_type/cases?sortDirection=DESC': '/:case_type',
    '/caseworkers/:id/jurisdictions/:jur/case-types/:case_type/cases?sortDirection=DESC&state=appealCreated&case.appeal.benefitType.code=PIP': '/:case_type',
    '/caseworkers/123141/jurisdictions/:jur/case-types/:case_type/cases/:caseId': '/caseSummary/:caseId',
    '/caseworkers/123141/jurisdictions/:jur/case-types/:case_type/cases/:caseId/events': '/events-:caseId'
}));
server.use(router);
server.use(middlewares);

server.listen(3004, () => {
    console.log('JSON Server is running');
});

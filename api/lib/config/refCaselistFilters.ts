export default
[
    {
        accessRoles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember'],
        caseType: 'Benefit',
        filter: '&state=appealCreated&case.appeal.benefitType.code=PIP',
        jur: 'SSCS',
    },
    {
        accessRoles: ['caseworker-divorce-judge'],
        caseType: 'DIVORCE',
        filter: '',
        jur: 'DIVORCE',
    },
    {
        accessRoles: ['caseworker-divorce-financialremedy-judiciary'],
        caseType: 'FinancialRemedyMVP2',
        filter: '&state=referredToJudge',
        jur: 'DIVORCE',
    },

]

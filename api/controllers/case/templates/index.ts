import { template as sscsBenefit } from './sscs/benefit'
import { template as cmc } from './cmc/moneyclaimcase'
import { template as probate } from './probate/grantofrepresentation'
import { template as divorce } from './divorce/divorce'
import { template as financialRemedy } from './divorce/financialremedy'
import { template as defaultTemplate } from './default/default'

const templates = {
    sscs: {
        benefit: sscsBenefit
    },
    cmc: {
        moneyclaimcase: cmc
    },
    probate: {
        grantofrepresentation: probate
    },
    divorce: {
        divorce,
        financialremedymvp2: financialRemedy
    }
}

export default function(jurisdiction, caseType) {
    const jud = templates[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultTemplate
    return template || defaultTemplate
}

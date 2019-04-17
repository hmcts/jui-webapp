/**
 * Check if the case list is empty.
 *
 * @param caseList @see unit test
 */
export function isCaseListEmpty(caseList) {

    return caseList[0].length > 0
}

/**
 * Within the work flow of case-list/index.ts getMutiJudCaseTransformed() it's been originally built in
 * a manner that makes it very hard to infer what's going on at each stage.
 *
 * I've attempted to make it easier to infer by investigating, and writing meaningful function names to
 * describe what is happening at each point of the flow.
 *
 * Hence why isCaseListPopulated and isAnyCaseViewableByAJudge have been given seperate function
 * names and linked through to isCaseListEmpty.
 *
 * @param caseList
 */
export function isCaseListPopulated(caseList) {

    return isCaseListEmpty(caseList)
}

/**
 * Check if any case is viewable by a Judge.
 *
 * At this step in the work flow we are checking if the case list is empty or not. If it is empty
 * then no cases are view by a Judge, if it is not empty then they are.
 *
 * @param caseList @see unit test
 */
export function isAnyCaseViewableByAJudge(caseList) {

    return isCaseListEmpty(caseList)
}

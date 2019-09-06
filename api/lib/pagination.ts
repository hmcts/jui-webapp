const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue
}

/**
 * Get Page Count for each Case Set
 *
 * The way JUI has been built is that when we retrieve Cases from CCD for a User, we retrieve all Cases for a User
 * based on their filters at once. An example being juitestmedical1sscs@mailnesia.com which has the filters
 * case.assignedToDisabilityMember=510604|Medical 1 and assignedToMedicalMember=510604|Medical 1
 *
 * We retrieve all Cases based on those filters at once.
 *
 * We do the same for the pagination metadata for those cases - We retrieve all Pagination metadata for both filters at once.
 *
 * This is based on how JUI has been originally built.
 *
 * All Cases are displayed to the User in one screen. Therefore for now we are going to concat the
 * total pages count, and display this as the pagination number.
 *
 * In a scenario where a User has Cases in both their sets of filters ( which shouldn't happen due to Filtering
 * on CCD side ) the User will see a larger list of Pages, but this is fine as they User will click on a later
 * page number and see a 'You have no Cases on this Page'.
 *
 * @param paginationMetadata @see Unit Test
 */
const getPageCountForEachCaseSet = paginationMetadata => paginationMetadata.map(paginationResultForCaseSet => paginationResultForCaseSet.total_pages_count)

export function getTotalPages(paginationMetadataForCaseSets) {

    const totalPagesCount = getPageCountForEachCaseSet(paginationMetadataForCaseSets)

    return totalPagesCount.reduce(reducer)
}

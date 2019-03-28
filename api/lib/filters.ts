import refCaselistFilters from '../lib/config/refCaselistFilters'
import refCaselistRoleFilters from '../lib/config/refCaselistRoleFilters'
import { ERROR_USER_HAS_NO_MATCHING_ACCESS_ROLE } from './config/errorConstants'
import { exists } from './util'

/**
 * filterCaseListsByRoles
 *
 * Runs through the case filters as seen in refCaselistFilters, and filters based on the users defined roles.
 *
 * The users roles are passed straight into roles.
 *
 * @param caseListFilters @see refCaselistFilters.ts
 * @param roles - the user roles - eg. ['caseworker-sscs-judge', 'caseworker-sscs-panelmember']
 */
export function filterCaseListsByRoles(caseListFilters, roles) {
    const filters = caseListFilters.filter( caseListFilter => {
        return caseListFilter.accessRoles.some( accessRole => roles.includes(accessRole))
    })
    if (!exists(filters, 'length')) {
        return ERROR_USER_HAS_NO_MATCHING_ACCESS_ROLE
    }
    return filters
}

export function filterByCaseTypeAndRole(userDetails) {
    const filters = []
    const roles = userDetails.roles
    const caseListFilters = this.filterCaseListsByRoles(refCaselistFilters, roles)

    caseListFilters.forEach(filter => {
        let found = false

        const roleFilterKeys = Object.keys(refCaselistRoleFilters)

        // search roles for a role that appies to  the user role and create filters
        // for all filters specified for that role

        roleFilterKeys.forEach(roleFilter => {
            if (roleFilter !== 'default') {
                if (roles.indexOf(roleFilter) >= 0) {
                    found = true

                    Object.keys(refCaselistRoleFilters[roleFilter]).forEach(filterKey => {
                        const prefilter = JSON.parse(JSON.stringify(filter))
                        prefilter.filter = `${filter.filter}&${filterKey}=${
                            userDetails[refCaselistRoleFilters[roleFilter][filterKey]]
                            }`

                        // need to add the name to the filter
                        prefilter.filter += '|' + userDetails.forename + ' ' + userDetails.surname

                        filters.push(prefilter)
                    })
                }
            }
        })

        // if spcific role not found default to filtering by judge
        if (!found) {
            Object.keys(refCaselistRoleFilters['default']).forEach(filterKey => {
                const prefilter = JSON.parse(JSON.stringify(filter))
                prefilter.filter = `${filter.filter}&${filterKey}=${userDetails[refCaselistRoleFilters['default'][filterKey]]}`
                filters.push(prefilter)
            })
        }
    })

    return filters
}

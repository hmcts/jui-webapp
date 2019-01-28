import refCaselistFilters from '../lib/config/refCaselistFilters'
import refCaselistRoleFilters from '../lib/config/refCaselistRoleFilters'
import { getDetails } from '../services/idam-api/idam-api'

export function filterByCaseTypeAndRole(userDetails) {
    const filters = []
    const roles = userDetails.roles
    refCaselistFilters.forEach(filter => {
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

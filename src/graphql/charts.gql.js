export const TOP_PROJECTS_QUERY = /* GraphQL */ `
  query {
    top_projects: xp_view(
      where: {
        path: { _like: "%/dakar/div-01%" }
        _and: [
          { path: {_nlike: "%checkpoint%" } }
          { path: { _nlike: "%piscine-js-2%" } }
          { path: { _nlike: "%piscine-rust%" } }
        ]
      }
      order_by: { amount: desc }
      limit: 5
    ) {
      project: path
      amount
    }
  }
`

//__________________________________________________________
//

export const PROGRESS_QUERY = /* GraphQL */ `
  query {
    xp_progress: transaction(
      where: { type: { _eq: "xp" }, eventId: { _eq: 56 } }
      order_by: { createdAt: asc }
    ) {
      date: createdAt
      amount
    }
  }
`

//__________________________________________________________________________
//

export const SKILLS_QUERY = /* GraphQL */ `
  query {
    skills: transaction(
      where: { eventId: { _eq: 56 }, _and: { type: { _like: "skill_%" } } }
      distinct_on: type
      order_by: { type: asc, amount: desc }
    ) {
      type
      amount
    }
  }
`
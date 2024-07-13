export const TOP_PROJECTS_QUERY = /* GraphQL */ `
  query {
    top_projects: xp_view(
      where: {
        path: { _like: "%/dakar/div-01%" }
      }
      order_by: { amount: desc }
      limit: 10
    ) {
      path
      amount
    }
  }
`

//-------------------------------------------------------------------------

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

//-------------------------------------------------------------------------

export const SKILLS_QUERY = /* GraphQL */ `
  query {
    skill: transaction(
      where: { eventId: { _eq: 56 }, _and: { type: { _like: "skill_%" } } }
      distinct_on: type
      order_by: { type: asc, amount: desc }
    ) {
      type
      amount
      path
    }
  }
`
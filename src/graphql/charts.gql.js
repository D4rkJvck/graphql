export const TOP_PROJECTS_QUERY = /* GraphQL */ `
  query {
    top_projects: xp_view(
      where: {
        event: { object: { type: { _eq: "module" } } }
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
      where: {
        type: { _eq: "xp" }
        event: { object: { type: { _eq: "module" } } }
      }
      order_by: { createdAt: asc }
    ) {
      date: createdAt
      amount
      path
    }
  }
`

//__________________________________________________________________________
//

export const SKILLS_QUERY = /* GraphQL */ `
  query {
    skills: transaction(
      where: { type: { _like: "skill_%" } }
      distinct_on: type
      order_by: { type: asc, amount: desc }
    ) {
      type
      amount
    }
  }
`

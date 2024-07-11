export const TOP_PROJECTS_QUERY = /* GraphQL */ `
  query {
    xp_view(
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
export const PROGRESS_QUERY = /* GraphQL */ `
  query {
    transaction(
      where: { type: { _eq: "xp" }, eventId: { _eq: 56 } }
      order_by: { createdAt: desc }
    ) {
      createdAt
      path
      amount
      type
    }
  }
`

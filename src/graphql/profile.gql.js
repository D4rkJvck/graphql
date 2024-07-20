export const PROFILE_QUERY = /* GraphQL */ `
  query {
    user_info: user {
      login
      firstName
      lastName
      auditRatio
      events(where: { eventId: { _eq: 56 } }) {
        level
      }
    }
    xp_amount: transaction_aggregate(
      where: { type: { _eq: "xp" }, event: { path: { _eq: "/dakar/div-01" } } }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`

//___________________________________________________________________________________
//

export const AUDIT_QUERY = /* GraphQL */ `
  query {
    audit: user {
      done: totalUp
      received: totalDown
    }
  }
`

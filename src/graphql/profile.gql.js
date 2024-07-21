export const PROFILE_QUERY = /* GraphQL */ `
query {
  user_info: user {
    login
    attrs
    auditRatio
    firstName
    lastName
    events(where: { event: { object: { type: { _eq: "module" } } } }) {
      level
    }
  }
  xp_amount: transaction_aggregate(
    where: {
      type: { _eq: "xp" }
      event: { object: { type: { _eq: "module" } } }
    }
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

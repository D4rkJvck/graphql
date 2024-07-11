export const fetchFromGraphiQL = async query => {
    const token = localStorage.getItem('jwtToken')

    return fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch from GraphiQL')
            }
            return response.json()
        })
        .catch(error => console.log('ERROR: ', error))
}

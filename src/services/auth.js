export const loginTalent = async credentials => {
    return fetch('https://learn.zone01dakar.sn/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to authenticate')
            }
            return response.json()
        })
        .catch((error) => console.log('ERROR: ', error))
}
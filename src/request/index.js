export default function sendRequest({ query, variables }) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    }).then((res) => res.json())
}
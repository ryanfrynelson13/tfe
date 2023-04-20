export const getToken = () => {
    const token = localStorage.getItem('access_token')
    const bearer = JSON.parse(token ?? 'null')

    return bearer
}
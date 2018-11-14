// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    return localStorage.getItem('piscium-authority');
}

export function setAuthority(authority) {
    return localStorage.setItem('piscium-authority', authority);
}
// Request
// {
//     password: "pwd",
//     type: "account",
//     userName: "username",
// }

// Response
// {
//     status: 'ok' or 'error',
//     type: 'account',
//     currentAuthority: 'admin', 'user', or 'guest'
// }

export const getRegister = (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
};

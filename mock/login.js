// Request Payload
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

const notifycount = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const userid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const userpwd = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const username = [
    'jlax_admin',
    'cris_admin',
    'mwu_admin',
    'xhan_admin',
    'jlax_user',
    'cris_user',
    'mwu_user',
    'xhan_user',
    'jlax_guest',
    'cris_guest',
    'mwu_guest',
    'xhan_guest',
];

const role = [
    'admin',
    'admin',
    'admin',
    'admin',
    'user',
    'user',
    'user',
    'user',
    'guest',
    'guest',
    'guest',
    'guest',
];

const avatar = [
    '/public/jlax.jpg', // jlax
    '/public/cris.jpg', // cris
    '/public/mwu.jpg', // mwu
    '/public/xhan.jpg', // xhan
    '/public/jlax.jpg', // jlax
    '/public/cris.jpg', // cris
    '/public/mwu.jpg', // mwu
    '/public/xhan.jpg', // xhan
    '/public/jlax.jpg', // jlax
    '/public/cris.jpg', // cris
    '/public/mwu.jpg', // mwu
    '/public/xhan.jpg', // xhan
];

export const getLogin = (req, res) => {
    const { password, userName, type } = req.body;
    if (username.indexOf(userName) > -1 && password === userpwd[username.indexOf(userName)]) {
        res.send({
            status: 'ok',
            type,
            currentAuthority: role[username.indexOf(userName)],
            userid: userid[username.indexOf(userName)],
            username: username[username.indexOf(userName)],
            avatar: avatar[username.indexOf(userName)],
            notifycount: notifycount[username.indexOf(userName)],
        });
        return;
    }
    res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
    });
};

export default {
    getLogin,
};

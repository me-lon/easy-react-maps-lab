const userid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

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

const avatars = [
    '../public/jlax.jpg', // jlax
    '../public/cris.jpg', // cris
    '../public/mwu.jpg', // mwu
    '../public/xhan.jpg', // xhan
    '../public/jlax.jpg', // jlax
    '../public/cris.jpg', // cris
    '../public/mwu.jpg', // mwu
    '../public/xhan.jpg', // xhan
    '../public/jlax.jpg', // jlax
    '../public/cris.jpg', // cris
    '../public/mwu.jpg', // mwu
    '../public/xhan.jpg', // xhan
];

const desc = [
    'jlaxlopez@gmail.com',
    'cris@gmail.com',
    'menglongwu3@gmail.com',
    'xhan01@ucm.es',
    'jlaxlopez@gmail.com',
    'cris@gmail.com',
    'menglongwu3@gmail.com',
    'xhan01@ucm.es',
    'jlaxlopez@gmail.com',
    'cris@gmail.com',
    'menglongwu3@gmail.com',
    'xhan01@ucm.es',
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

const position = [
    'Careers Service',
    'Ceremonies Office',
    'Chaplaincy – Multi-Faith Chaplaincy Service',
    'CiCS - abbreviation for Corporate Information & Computing Services',
    'Cleaning Services',
    'Community Relations',
    'Conference Services',
    'Corporate Communications',
    'Corporate Information & Computing Services',
    'Counselling Service',
    'Development and Alumni Relations',
    'Disability and Dyslexia Support Service',
];

export function UserList() {
    const count = username.length;
    const list = [];
    for (let i = 0; i < count; i += 1) {
        list.push({
            id: userid[i % count],
            username: username[i % count],
            href: `https://localhost:8000/people/${userid[i % count]}`,
            email: desc[i % count],
            logo: avatars[i % count],
            role: role[i % count],
            updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
            createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
            status: ['verified', 'unverified'][i % 2],
            position: position[i % count],
        });
    }
    return list;
}

export function getUserList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const result = UserList();

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default getUserList;

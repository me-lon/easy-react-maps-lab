const notifycount = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

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

const avatar = [
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

export function getPeople(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const index = userid.indexOf(id);

    if (index > -1) {
        res.send({
            userid: userid[index],
            name: username[index],
            avatar: avatar[index],
            notifyCount: notifycount[index],
            position: position[index],
        });
    }
}

export default {
    getPeople,
};

import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: 'Analysis page',
                path: 'analysis',
            },
            {
                name: 'Workbench',
                path: 'workplace',
                // hideInBreadcrumb: true,
                // hideInMenu: true,
            },
        ],
    },
    {
        name: 'List',
        icon: 'coffee',
        path: 'list',
        children: [
            {
                name: 'Movie',
                path: 'movie',
                children: [
                    {
                        name: 'Episode',
                        path: 'episode',
                    },
                ],
            },
        ],
    },
    {
        name: 'User center',
        icon: 'user',
        path: 'usercenter',
        children: [
            {
                name: 'User list',
                path: 'user-list',
                hideInBreadcrumb: true,
            },
        ],
    },
    {
        name: 'Maps',
        icon: 'picture',
        path: 'maps',
    },
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);

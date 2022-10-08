export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manager-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/admin-manage'
            },
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/system/manager-schedule'
            }
        ]
    },
    { //quan li phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manager-schedule'
            }
        ]
    },
    { //quan li phong kham
        name: 'menu.admin.speciality',
        menus: [
            {
                name: 'menu.admin.manage-speciality', link: '/system/manager-specialty'
            }
        ]
    },
    { //quan li cam nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/user-manage'
            }
        ]
    },


];
export const doctorMenu = [
    { //quản lí người dùng 
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.schedule', link: '/system/manager-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },

                // ]
            },
        ]
    },

];
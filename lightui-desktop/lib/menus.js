var menus = [
    {
        index: 0,
        title: 'dashboard',
        icon:'dashboard',
        path: '/dashboard/index'
    },
    {
        index: 1,
        title: '分析页',
        icon: 'dashboard',
        path: '/dashboard/analysis'
    },
    {
        index: 2,
        title: '监控页',
        icon: 'dashboard',
        path: '/dashboard/monitor'        
    },
    {
        index: 3,
        title: '全局页',
        icon: 'basic',        
        options: [
            {
                title: '布局',
                path: '/index/basic/layout'
            },
            {
                title: '色彩',
                path: '/index/basic/color'
            },
            {
                title: '图标',
                path: '/index/basic/icon'
            }, {
                title: '过渡动画',
                path: '/index/basic/animation'
            }
        ]
    },
    // {
    //     index: 2,
    //     title: '导航页',
    //     icon: 'nav',        
    //     options: [
    //         {
    //             title: '导航菜单',
    //             path: '/index/nav/menu'
    //         },
    //         {
    //             title: '标签页',
    //             path: '/index/nav/tabs'
    //         }]
    // },
    {
        index: 4,
        title: '表单页',
        icon: 'form',        
        options: [
            {
                title: '基础表单',
                path: '/index/form/basic'
            },
            {
                title: '校验表单',
                path: '/index/form/validate'
            },
            {
                title: '分步表单',
                path: '/index/form/step'
            },
            {
                title: '分组表单',
                path: '/index/form/group'
            }
        ]
    },
    {
        index: 5,
        title: '表格页',
        icon: 'table',
        options: [
            {
                title: '基础表格',
                path: '/index/table/basic'
            },
            {
                title: '可操作表格',
                path: '/index/table/operable'
            },
            {
                title: '查询表格',
                path: '/index/table/search'
            },{
                title: '折叠表格',
                path: '/index/table/fold'
            }]
    },
    {
        index: 6,
        title: '弹框页',
        icon: 'dialog',        
        options: [
            {
                title: '提示弹框',
                path: '/index/dialog/message-box'
            },
            {
                title: '编辑弹框',
                path: '/index/dialog/confirm'
            },
            {
                title: '查看弹框',
                path: '/index/dialog/preview'
            }
        ]
    },
    // {
    //     index: 6,
    //     title: '通知页',
    //     icon: 'notice',        
    //     options: [
    //         {
    //             title: '操作反馈',
    //             path: '/index/notice/message'
    //         },
    //         {
    //             title: '重要提示',
    //             path: '/index/notice/alert'
    //         },
    //         {
    //             title: '通知',
    //             path: '/index/notice/notification'
    //         }
    //     ]
    // },
    {
        index: 7,
        title: '卡片页',
        icon: 'card',        
        options: [
            {
                title: '基础卡片',
                path: '/index/card/basic'
            },
            {
                title: '卡片管理',
                path: '/index/card/manage'
            }
        ]
    },
    {
        index: 8,
        title: '异常页',
        icon: 'error',        
        options: [
            {
                title: '403',
                path: '/index/error/403'
            },
            {
                title: '404',
                path: '/index/error/404'
            },
            {
                title: '500',
                path: '/index/error/500'
            }
        ]
    },
    
]

export default menus;
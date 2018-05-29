var menus = [
    {
        index: 0,
        title: 'dashboard',
        options: [
            {
                title: '分析页',
                path: '/index/dashboard/analysis'
            },
            {
                title: '关于',
                path: '/index/dashboard/about'
            }]
    },
    {
        index: 1,
        title: '表单页',
        options: [
            {
                title: '基础表单',
                path: '/index/form/basic'
            },
            {
                title: '行内表单',
                path: '/index/form/inline'
            },
            {
                title: '校验表单',
                path: '/index/form/validate'
            }
        ]
    },
    {
        index: 2,
        title: '表格页',
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
                title: '搜索表格',
                path: '/index/table/search'
            }]
    },
    {
        index: 3,
        title: '弹框页',
        options: [
            {
                title: '基础表格',
                path: '/index/dialog/basic'
            },
            {
                title: '可操作表格',
                path: '/index/dialog/message'
            },
            {
                title: '警告',
                path: '/index/dialog/confirm'
            }
        ]
    },
    {
        index: 4,
        title: '提示页',
        options: [
            {
                title: '提醒',
                path: '/index/notice/tip'
            },
            {
                title: '可操作表格',
                path: '/index/notice/popover'
            }
        ]
    },
    {
        index: 5,
        title: '异常页',
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
            }]
    }
]

export default menus;
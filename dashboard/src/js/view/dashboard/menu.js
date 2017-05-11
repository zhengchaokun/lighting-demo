;(function () {
    App.defineViewModel("#dashboardMenu", {
        data: {
            menuItems:null
        },
        watch: {},
        methods: {}
    }, {
        ready: function () {
        },
        beforeRender: function (params) {
            //TODO:远程根据权限获取菜单，菜单条目作为模型渲染在页面中

            var that = this;
            API.getMenuItems().then(function (items) {
                that.model.menuItems = items;
            })
        },
        afterRender: function (params) {
        },
        beforeUnRender: function () {
        },
        afterUnRender: function () {
        }
    });
})();


App.registerView({
    path:"/dashboard",
    el:"#dashboard",
    home:false
});

App.registerView({
    path:"/dashboard/container",
    el:"#dashboardContainer",
    home:false,
    parent:"#dashboard"
});

App.registerView({
    path:"/dashboard/menu",
    el:"#dashboardMenu",
    home:false,
    parent:"#dashboardContainer"
});

App.registerView({
    path:"/dashboard/menu/index",
    el:"#dashboardMenuIndex",
    home:true,
    parent:"#dashboardMenu"
});

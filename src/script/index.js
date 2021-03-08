var m = require("mithril")
var layout = require("../views/layout")
var home = require("../views/home")

m.route(document.body, "/", {
    "/":{
        render: function() {
            return m(layout, m(home))
        }
    }
})
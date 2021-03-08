var m = require("mithril")

module.exports = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", []),
            m("section", vnode.children)
        ])
    }
}
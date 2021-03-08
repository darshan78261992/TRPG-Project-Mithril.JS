var m = require("mithril")
var home = require("../models/home")
function getSkillInformation(skill) {
    $(".attribute").each(function () {
        if (!$(this).hasClass('hide')) {
            $(this).addClass('hide')
        }
    })
    let point = 0;
    switch (skill) {
        case 'Strength':
            point = $("#strength").val() != "" ? $("#strength").val() : 0;
            break;
        case 'Dexterity':
            point = $("#dexterity").val() != "" ? $("#dexterity").val() : 0;
            break;
        case 'Mind':
            point = $("#mind").val() != "" ? $("#mind").val() : 0;
            break;
        case 'Presence':
            point = $("#presence").val() != "" ? $("#presence").val() : 0;
            break;
    }
    const rank = home.checkRankPoint(point);
    home.skillAttributeList.forEach(sa => {

        if (sa.attribute === skill) {
            sa.skills.forEach(ss => {
                ss.rank = rank.split("-")[0];
                ss.value = home.fetchSkillPoint(rank.split("-")[0], parseInt(rank.split("-")[1], 10));
            });
        }
    });
    m.redraw();
    $("." + skill).removeClass('hide');
}
module.exports = {
    oninit: home.loadAttributeList,
    oninit: home.loadCombatAttributeList,
    oninit: home.loadSkillAttributeList,
    view: function () {

        return m("div", [m("div.container", [
            m("div.row", [
                m("div.col-md-12", [
                    m("div.col-md-3", [
                        m("label.label", "Player Name"),
                        m("input.form-control[placeholder=Player Name]", {
                            value: "Darshan Dave"
                        })
                    ]),
                    m("div.col-md-3", [
                        m("button", {
                            class: "btn btn-info",
                            onclick: function () { alert("Player profile has exported.") }
                        }, "Export"),
                        m("button.btn.btn-info", {
                            class: "btn btn-info",
                            onclick: function () { alert("Player profile has imported.") }
                        }, "Import")
                    ])
                ])
            ])
        ]), m("br"),
        m("div.container", [
            m("div.row", [
                m("div.col-md-12", [
                    m("div.col-md-6", [
                        m("input", {
                            type: "checkbox",
                            onchange: function () {
                                debugger
                                if ($(this)[0].checked) {
                                    home.armorBonus = 5
                                    $("#evasion").val(parseInt($("#evasion").val(), 10) + parseInt(home.armorBonus, 10))
                                    $("#armor").val(parseInt($("#armor").val(), 10) + parseInt(home.armorBonus, 10))
                                } else {
                                    $("#evasion").val(parseInt($("#evasion").val(), 10) - parseInt(home.armorBonus, 10))
                                    $("#armor").val(parseInt($("#armor").val(), 10) - parseInt(home.armorBonus, 10))
                                    home.armorBonus = 0
                                }
                            }
                        }), m("label.label", "Armor Bonus")
                    ]),
                    m("div.col-md-6", [
                        m("input", {
                            type: "checkbox",
                            onchange: function () {
                                if ($(this)[0].checked) {
                                    home.traitsBonus = 2
                                    $("#evasion").val(parseInt($("#evasion").val(), 10) + parseInt(home.traitsBonus, 10))
                                    $("#armor").val(parseInt($("#armor").val(), 10) + parseInt(home.traitsBonus, 10))
                                } else {
                                    $("#evasion").val(parseInt($("#evasion").val(), 10) - parseInt(home.traitsBonus, 10))
                                    $("#armor").val(parseInt($("#armor").val(), 10) - parseInt(home.traitsBonus, 10))
                                    home.traitsBonus = 0
                                }
                            }
                        }), m("label.label", "Traits Bonus")
                    ])
                ])
            ])
        ]),
        m("div.container", [
            m("div.row", [
                m("div.col-md-12", [
                    m("div.col-md-3"), ["Attributes Points"],
                    m("div.col-md-3"), home.attributeList.map(function (attribute) {
                        return m("label.label", attribute.attributeName,
                            m("input.form-control", {
                                id: attribute.attributeName,
                                attributename: attribute.attributeName,
                                oninput: function (event) {
                                    switch (event.target.getAttribute('attributename')) {
                                        case 'strength':
                                            $("#vitality").val(3 + parseInt(event.target.value != "" ? event.target.value : 0, 10));
                                            break;
                                        case 'dexterity':
                                            $("#evasion").val(10 + home.armorBonus + home.traitsBonus +
                                                parseInt(event.target.value != "" ? event.target.value : 0, 10));
                                            $("#armor").val(10 + home.armorBonus + home.traitsBonus +
                                                parseInt(event.target.value != "" ? event.target.value : 0, 10));
                                            $("#alacrity").val(parseInt($("#mind").val() != "" ? $("#mind").val() : 0, 10) +
                                                parseInt(event.target.value != "" ? event.target.value : 0, 10));
                                            break;
                                        case 'mind':
                                            $("#alacrity").val(parseInt($("#dexterity").val(), 10)
                                                + parseInt(event.target.value, 10));
                                            break;
                                        case 'presence':
                                            $("#tenacity").val(1 + parseInt(event.target.value, 10));
                                            break;
                                    }
                                }
                            }))
                    }),
                    m("label.label", "Damage", [m("input.form-control", {
                        oninput: function (event) {
                            const vitality = parseInt(($("#strength").val() != "" ? $("#strength").val() : 0), 10) + 3;
                            const damage = ($(this).val() != "" ? parseInt($(this).val(), 10) : vitality)
                            if ($(this).val() != "") {
                                const finalVaule = vitality - damage;
                                $("#vitality").val(finalVaule);
                            } else {
                                $("#vitality").val(vitality);
                            }
                        }
                    })])
                ])
            ])
        ]), m("br"),
        m("div.container", [
            m("div.row", [
                m("div.col-md-12", [
                    m("div.col-md-3"), ["Combat Attributes Points"],
                    m("div.col-md-3"), home.combatAttributeList.map(function (attribute) {
                        return m("label.label", attribute.attributeName,
                            m("input.form-control", {
                                id: attribute.attributeName,
                                disabled: true
                            }))
                    })
                ])
            ])
        ]), m("br"),
        m("div.container", [
            m("div.row", [
                m("div.col-md-12", [
                    m("div.col-md-3"), ["Skill Attributes Points"],
                    m("div.col-md-3"), [
                        m("select", {
                            id: "skillsDDL",
                            onchange: function (e) {
                                home.selectedSkill = e.target.value;
                                getSkillInformation(home.selectedSkill);
                            }
                        }, [m("option", "Select Skill"), home.skillAttributeList.map(function (skill) {
                            return m("option", { value: skill.attribute }, skill.attribute)
                        })])
                    ], m("div.col-md-3", [m("button.btn.btn-info", {
                        onclick: function () {
                            getSkillInformation(home.selectedSkill);
                        }
                    }, "Refersh")]),
                    m("div.col-md-3"), [m("div", home.skillAttributeList.map(function (attribute) {
                        return m("label.label.attribute.hide", { class: attribute.attribute }, attribute.attribute, [m("br"), m("table.table", attribute.skills.map(function (skill) {
                            return m("tr", [m("td", skill.name), m("td", skill.rank), m("td", skill.value)])
                        }))])
                    }))]
                ])
            ])
        ])
        ])
    }
}
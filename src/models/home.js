var m = require('mithril')

var home = {
    attributeList: [
        {
            "attributeName": "strength",
            "value": 0
        },
        {
            "attributeName": "dexterity",
            "value": 0
        },
        {
            "attributeName": "mind",
            "value": 0
        },
        {
            "attributeName": "presence",
            "value": 0
        }
    ],
    combatAttributeList: [
        {
            "attributeName": "vitality",
            "value": 0
        },
        {
            "attributeName": "evasion",
            "value": 0
        },
        {
            "attributeName": "armor",
            "value": 0
        },
        {
            "attributeName": "alacrity",
            "value": 0
        },
        {
            "attributeName": "tenacity",
            "value": 0
        },
        {
            "attributeName": "power",
            "value": 0
        }
    ],
    skillAttributeList: [
        {
            "attribute": "Strength",
            "skills": [
                {
                    "name": "Fighting",
                    "rank": "",
                    "value": 0
                }
            ]
        },
        {
            "attribute": "Dexterity",
            "skills": [
                {
                    "name": "Fighting",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Thievery",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Stealth",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Archery",
                    "rank": "",
                    "value": 0
                }
            ]
        },
        {
            "attribute": "Mind",
            "skills": [
                {
                    "name": "Learned",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Survival",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Perception",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Apothecary",
                    "rank": "",
                    "value": 0
                }
            ]
        },
        {
            "attribute": "Presence",
            "skills": [
                {
                    "name": "Intimidation",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Performance",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Manipulation",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Insight",
                    "rank": "",
                    "value": 0
                },
                {
                    "name": "Power",
                    "rank": "",
                    "value": 0
                }
            ]
        }
    ],
    armorBonus: 0, traitsBonus: 0,selectedSkill:"",
    loadAttributeList: function () {
        return this.attributeList;
    },
    loadCombatAttributeList: function () {
        return this.combatAttributeList;
    },
    loadSkillAttributeList: function () {
        return this.skillAttributeList;
    },
    checkRankPoint: function (point) {
        switch (true) {
            case point >= 80 && point < 100:
                return "Expert-4";
            case point >= 60 && point < 80:
                return "Adept-3";
            case point >= 40 && point < 60:
                return "Apprentice-2";
            case point >= 20 && point < 40:
                return "Novice-1";
            case point < 20:
                return "Untrained-0";
            default:
                return "Master-5";
        }
    },
    fetchSkillPoint: function (rankName, rank) {
        let level = 0;
        if (rankName === 'Untrained') {
            level = Math.min(
                this.getRandom(1, 20),
                this.getRandom(1, 20)
            );
        } else {
            level = this.getRandom(1, 20) + this.getRandom(1, 4 + 2 * (rank - 1));
        }
        return level;
    },
    getRandom: function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
}

module.exports = home
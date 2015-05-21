var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _damage = 0;
    var _props = {};

    var _classTable = {
      'No Class' : { hpPerLevel : 5,  damage : 1, attackProgression : 1/2 },
      'Fighter'  : { hpPerLevel : 10, damage : 1, attackProgression : 1   },
      'Rogue'    : { hpPerLevel : 5,  damage : 1, attackProgression : 1/2 },
      'War Monk' : { hpPerLevel : 6,  damage : 3, attackProgression : 2/3 },
      'Paladin'  : { hpPerLevel : 8,  damage : 1, attackProgression : 1   }
    }

    function propertyFn(name, defaultVal, validator) {
      _props[name] = defaultVal;
      return function(val) {
        if (val !== undefined) {
          if (validator) validator(val);
          _props[name] = val;
        }
        return _props[name];
      };
    }

    function abilityScoreFn(name) {
      _props[name] = Evercraft.Ability.create();
      return _props[name].score;
    }

    function level() {
      return 1 + Math.floor(_props.xp / 1000);
    }

    function armorClass() {
      return _props.class === 'War Monk' ? armorClassPlusDex() + wisBonus() : armorClassPlusDex();
    }

    function maxHitPoints() {
      return hitPointsPerLevel() * level();
    }

    function hitPoints() {
      return maxHitPoints() - _damage;
    }

    function alive() {
      return hitPoints() > 0;
    }

    function attackModifier() {
      return _props.class === 'Rogue' ? baseAttack() + dexModifier() : baseAttack() + strModifier();
    }

    function attackDamage() {
      return Math.max(baseDamage(), 1);
    }

    function damage(points) {
      _damage += points;
    }

    function armorClassPlusDex() {
      return 10 + dexModifier();
    }

    function hitPointsPerLevel() {
      return Math.max(baseHitPointsPerLevel() + conModifier(), 1);
    }

    function baseHitPointsPerLevel() {
      return _classTable[_props.class].hpPerLevel;
    }

    function baseAttack() {
      return Math.floor(level() * attackProgression());
    }

    function attackProgression() {
      return _classTable[_props.class].attackProgression;
    }

    function baseDamage() {
      return _classTable[_props.class].damage + strModifier();
    }

    function strModifier() {
      return _props.race === "Orc" ? _props.str.modifier() + 2: _props.str.modifier();
    }

    function dexModifier() {
      return _props.dex.modifier();
    }

    function conModifier() {
      return _props.con.modifier();
    }

    function intModifier() {
      return _props.race === "Orc" ? _props.int.modifier() - 1 : _props.int.modifier();
    }

    function wisModifier() {
      return _props.race === "Orc" ? _props.wis.modifier() - 1 : _props.wis.modifier();
    }

    function chaModifier() {
      return _props.race === "Orc" ? _props.cha.modifier() - 1 : _props.cha.modifier();
    }

    function wisBonus() {
      return Math.max(0, wisModifier());
    }

    function validateAlignment(val) {
      if (!alignmentIsValid(val))
        throw "Alignment can only be GOOD, NEUTRAL, or EVIL";
    }

    function alignmentIsValid(val) {
      return ["GOOD", "NEUTRAL", "EVIL"].indexOf(val) !== -1;
    }

    return {
      name : propertyFn("name", ""),
      alignment : propertyFn("alignment", "NEUTRAL", validateAlignment),
      experiencePoints : propertyFn("xp", 0),
      characterClass : propertyFn("class", "No Class"),
      race : propertyFn("race", "Human"),

      strengthScore : abilityScoreFn("str"),
      strengthModifier : strModifier,

      dexterityScore : abilityScoreFn("dex"),
      dexterityModifier : dexModifier,

      constitutionScore : abilityScoreFn("con"),
      constitutionModifier : conModifier,

      intelligenceScore : abilityScoreFn("int"),
      intelligenceModifier : intModifier,

      wisdomScore : abilityScoreFn("wis"),
      wisdomModifier : wisModifier,

      charismaScore : abilityScoreFn("cha"),
      charismaModifier : chaModifier,

      level : level,
      armorClass : armorClass,
      maxHitPoints : maxHitPoints,
      hitPoints : hitPoints,
      alive : alive,
      attackModifier : attackModifier,
      attackDamage : attackDamage,
      damage : damage
    };

  }
};

var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";
    var _class = "No Class";
    var _xp = 0;

    var _alignment = "NEUTRAL";
    var _damage = 0;
    var _props = {};
    var _abilities = {};

    function propertyFn(name, defaultVal, validator) {
      _props[name] = defaultVal;
      return function(val) {
        if (val !== undefined) {
          if (validator) validator(val);
          _props[name] = val;
        }
        return _props[name];
      }
    }

    function abilityFn(name) {
      _props[name] = Evercraft.Ability.create();
      return function() {
        return _props[name];
      }
    }

    function level() {
      return 1 + Math.floor(_props['xp'] / 1000);
    }

    function armorClass() {
      return 10 + _props["dex"].modifier();
    }

    function baseHitPointsPerLevel() {
      return _props["class"] === "Fighter" ? 10 : 5;
    }

    function hitPointsPerLevel() {
      return Math.max(baseHitPointsPerLevel() + _props["con"].modifier(), 1);
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

    function baseAttack() {
      return _props["class"] === 'Fighter' ? level() : Math.floor(level() / 2);
    }

    function attackModifier() {
      return baseAttack() + _props["str"].modifier();
    }

    function baseDamage() {
      return 1 + _props["str"].modifier();
    }

    function attackDamage() {
      return Math.max(baseDamage(), 1);
    }

    function criticalDamage() {
      return Math.max(baseDamage() * 2, 1);
    }

    function damage(points) {
      _damage += points;
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
      strength : abilityFn("str"),
      dexterity : abilityFn("dex"),
      constitution : abilityFn("con"),
      intelligence : abilityFn("int"),
      wisdom : abilityFn("wis"),
      charisma : abilityFn("cha"),
      level : level,
      armorClass : armorClass,
      maxHitPoints : maxHitPoints,
      hitPoints : hitPoints,
      alive : alive,
      attackModifier : attackModifier,
      attackDamage : attackDamage,
      criticalDamage : criticalDamage,
      damage : damage
    };

  }
};

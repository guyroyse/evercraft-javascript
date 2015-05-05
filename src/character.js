var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";
    var _alignment = "NEUTRAL";
    var _xp = 0;
    var _damage = 0;
    var _abilities = {};

    function name(val) {
      if (val !== undefined) _name = val;
      return _name;
    }

    function alignment(val) {
      if (val !== undefined) {
        validateAlignment(val);
        _alignment = val;
      }
      return _alignment;
    }

    function experiencePoints(val) {
      if (val !== undefined) _xp = val;
      return _xp;
    }

    function level() {
      return 1 + Math.floor(_xp / 1000);
    }

    function abilityFn(name) {
      _abilities[name] = Evercraft.Ability.create();
      return function() {
        return _abilities[name];
      }
    }

    function armorClass() {
      return 10 + _abilities["dexterity"].modifier();
    }

    function alive() {
      return hitPoints() > 0;
    }

    function maxHitPoints() {
      return Math.max(5 + _abilities["constitution"].modifier(), 1) * level();
    }

    function hitPoints() {
      return maxHitPoints() - _damage;
    }

    function attackModifier() {
      return _abilities["strength"].modifier() + Math.floor(level() / 2);
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

    function baseDamage() {
      return 1 + _abilities["strength"].modifier();
    }

    function validateAlignment(val) {
      if (!alignmentIsValid(val))
        throw "Alignment can only be GOOD, NEUTRAL, or EVIL";
    }

    function alignmentIsValid(val) {
      return ["GOOD", "NEUTRAL", "EVIL"].indexOf(val) !== -1;
    }

    return {
      name : name,
      alignment : alignment,
      experiencePoints : experiencePoints,
      level : level,
      armorClass : armorClass,
      alive : alive,
      maxHitPoints : maxHitPoints,
      hitPoints : hitPoints,
      attackModifier : attackModifier,
      attackDamage : attackDamage,
      criticalDamage : criticalDamage,
      damage : damage,
      strength : abilityFn("strength"),
      dexterity : abilityFn("dexterity"),
      constitution : abilityFn("constitution"),
      intelligence : abilityFn("intelligence"),
      wisdom : abilityFn("wisdom"),
      charisma : abilityFn("charisma")
    };

  }
};

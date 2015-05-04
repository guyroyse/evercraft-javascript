var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";
    var _alignment = "NEUTRAL";
    var _hitPoints = 5;
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

    function abilityFn(name) {
      _abilities[name] = Evercraft.Ability.create();
      return function() {
        return _abilities[name];
      }
    }

    function armorClass() {
      return 10;
    }

    function alive() {
      return _hitPoints > 0;
    }

    function hitPoints() {
      return _hitPoints;
    }

    function attackModifier() {
      return _abilities["strength"].modifier();
    }

    function attackDamage() {
      var damage = 1 + _abilities["strength"].modifier()
      return Math.max(damage, 1);
    }

    function damage(points) {
      _hitPoints -= points;
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
      armorClass : armorClass,
      alive : alive,
      hitPoints : hitPoints,
      attackModifier : attackModifier,
      attackDamage : attackDamage,
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

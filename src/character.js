var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _props = {};

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

    var self = {
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
      damage : damage,

      attackModifier : attackModifier,

      attackDamage : attackDamage
    };

    var _hp = Evercraft.HitPoints.create(self);
    var _ac = Evercraft.ArmorClass.create(self);
    var _am = Evercraft.AttackModifier.create(self);
    var _ad = Evercraft.AttackDamage.create(self);

    function level() {
      return 1 + Math.floor(_props.xp / 1000);
    }

    function armorClass() {
      return _ac.armorClass();
    }

    function maxHitPoints() {
      return _hp.maxHitPoints();
    }

    function hitPoints() {
      return _hp.hitPoints();
    }

    function alive() {
      return _hp.alive();
    }

    function damage(points) {
      _hp.damage(points);
    }

    function attackModifier() {
      return _am.attackModifier();
    }

    function attackDamage() {
      return _ad.attackDamage();
    }

    function strModifier() {
      return _props.race === "Orc" ? _props.str.modifier() + 2: _props.str.modifier();
    }

    function dexModifier() {
      return _props.dex.modifier();
    }

    function conModifier() {
      return _props.race === "Dwarf" ? _props.con.modifier() + 1 : _props.con.modifier();
    }

    function intModifier() {
      return _props.race === "Orc" ? _props.int.modifier() - 1 : _props.int.modifier();
    }

    function wisModifier() {
      return _props.race === "Orc" ? _props.wis.modifier() - 1 : _props.wis.modifier();
    }

    function chaModifier() {
      return _props.race === "Orc" || _props.race === "Dwarf" ? _props.cha.modifier() - 1 : _props.cha.modifier();
    }

    function validateAlignment(val) {
      if (!alignmentIsValid(val))
        throw "Alignment can only be GOOD, NEUTRAL, or EVIL";
    }

    function alignmentIsValid(val) {
      return ["GOOD", "NEUTRAL", "EVIL"].indexOf(val) !== -1;
    }

    return self;

  }
};

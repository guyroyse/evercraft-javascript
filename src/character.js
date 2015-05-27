var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var self = {};

    var _props = {};

    var _armorClass = Evercraft.ArmorClass.create(self);
    var _hitPoints = Evercraft.HitPoints.create(self);
    var _attackModifier = Evercraft.AttackModifier.create(self);
    var _attackDamage = Evercraft.AttackDamage.create(self);

    self.name = propertyFn("name", "");

    self.alignment = propertyFn("alignment", "NEUTRAL", function (val) {
      if (["GOOD", "NEUTRAL", "EVIL"].indexOf(val) === -1)
        throw "Alignment can only be GOOD, NEUTRAL, or EVIL";
    });

    self.experiencePoints = propertyFn("xp", 0);
    self.characterClass = propertyFn("class", "No Class");
    self.race = propertyFn("race", "Human");

    self.strengthScore = abilityScoreFn("str");
    self.strengthModifier = function() {
      return _props.race === "Orc" ? _props.str.modifier() + 2: _props.str.modifier();
    };

    self.dexterityScore = abilityScoreFn("dex");
    self.dexterityModifier = function() {
      return _props.race === "Elf" ? _props.dex.modifier() + 1: _props.dex.modifier();
    };

    self.constitutionScore = abilityScoreFn("con");
    self.constitutionModifier = function() {
      if (_props.race === "Dwarf") return _props.con.modifier() + 1;
      if (_props.race === "Elf") return _props.con.modifier() -1;
      return _props.con.modifier();
    };

    self.intelligenceScore = abilityScoreFn("int");
    self.intelligenceModifier = function() {
      return _props.race === "Orc" ? _props.int.modifier() - 1 : _props.int.modifier();
    };

    self.wisdomScore = abilityScoreFn("wis");
    self.wisdomModifier = function() {
      return _props.race === "Orc" ? _props.wis.modifier() - 1 : _props.wis.modifier();
    };

    self.charismaScore = abilityScoreFn("cha");
    self.charismaModifier = function() {
      return _props.race === "Orc" || _props.race === "Dwarf" ? _props.cha.modifier() - 1 : _props.cha.modifier();
    };

    self.level = function() {
      return 1 + Math.floor(_props.xp / 1000);
    };

    self.armorClass = function() {
      return _armorClass.armorClass();
    };

    self.maxHitPoints = function() {
      return _hitPoints.maxHitPoints();
    };

    self.hitPoints = function() {
      return _hitPoints.hitPoints();
    };

    self.alive = function() {
      return _hitPoints.alive();
    };

    self.damage = function (points) {
      _hitPoints.damage(points);
    };

    self.attackModifier = function() {
      return _attackModifier.attackModifier();
    };

    self.attackDamage = function() {
      return _attackDamage.attackDamage();
    };

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

    return self;

  }
};

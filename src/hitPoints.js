var Evercraft = Evercraft || {};

Evercraft.HitPoints = {
  create : function(character) {

    var _hpTable = { 'No Class' : 5, 'Fighter' : 10, 'Rogue' : 5, 'War Monk' : 6, 'Paladin' : 8 };

    var _damage = 0;

    function maxHitPoints() {
      return hitPointsPerLevel() * character.level();
    }

    function hitPoints() {
      return maxHitPoints() - _damage;
    }

    function alive() {
      return hitPoints() > 0;
    }

    function damage(points) {
      _damage += points;
    }

    function hitPointsPerLevel() {
      return Math.max(baseHitPointsPerLevel() + effectiveConModifier(), 1);
    }

    function effectiveConModifier() {
      return (isDwarf() && conModifierIsBonus()) ? conModifier() * 2 : conModifier();
    }

    function isDwarf() {
      return character.race() === 'Dwarf';
    }

    function conModifierIsBonus() {
      return conModifier() > 0;
    }

    function conModifier() {
      return character.constitutionModifier();
    }

    function baseHitPointsPerLevel() {
      return _hpTable[character.characterClass()];
    }

    return {
      maxHitPoints : maxHitPoints,
      hitPoints : hitPoints,
      alive : alive,
      damage : damage
    };

  }
};

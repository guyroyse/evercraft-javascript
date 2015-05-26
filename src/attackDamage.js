var Evercraft = Evercraft || {};

Evercraft.AttackDamage = {
  create : function(character) {

    var _damageTable = { 'No Class' : 1, 'Fighter' : 1, 'Rogue' : 1, 'War Monk' : 3, 'Paladin' : 1 };

    function attackDamage() {
      return Math.max(baseDamage(), 1);
    }

    function baseDamage() {
      return classDamage() + strModifier();
    }

    function classDamage() {
      return _damageTable[character.characterClass()];
    }

    function strModifier() {
      return character.strengthModifier();
    }

    return {
      attackDamage : attackDamage
    };

  }
};

var Evercraft = Evercraft || {};

Evercraft.AttackModifier = {
  create : function(character) {

    var _attackTable = { 'No Class' : 1/2, 'Fighter' : 1, 'Rogue' : 1/2, 'War Monk' : 2/3, 'Paladin' : 1 };

    function attackModifier() {
      return baseAttack() + abilityModifier();
    }

    function baseAttack() {
      return Math.floor(character.level() * attackProgression());
    }

    function abilityModifier() {
      return isRogue() ? dexModifier() : strModifier();
    }

    function attackProgression() {
      return _attackTable[character.characterClass()];
    }

    function isRogue() {
      return character.characterClass() === 'Rogue';
    }

    function dexModifier() {
      return character.dexterityModifier();
    }

    function strModifier() {
      return character.strengthModifier();
    }

    return {
      attackModifier : attackModifier
    };

  }
};

var Evercraft = Evercraft || {};

Evercraft.ArmorClass = {
  create : function(character) {

    function armorClass() {
      var ac = armorClassPlusDex();
      if (isOrc()) ac = ac + 2;
      if (isWarMonk()) ac = ac + wisBonus();
      return ac;
    }

    function armorClassPlusDex() {
      return 10 + dexModifier();
    }

    function dexModifier() {
      return character.dexterityModifier();
    }

    function wisBonus() {
      return Math.max(0, wisModifier());
    }

    function wisModifier() {
      return character.wisdomModifier();
    }

    function isOrc() {
      return character.race() === 'Orc';
    }

    function isWarMonk() {
      return character.characterClass() === 'War Monk';
    }

    return {
      armorClass : armorClass
    }

  }
};

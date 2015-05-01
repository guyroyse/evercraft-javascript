var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";
    var _alignment = "NEUTRAL";
    var _hitPoints = 5;

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

    function armorClass() {
      return 10;
    }

    function hitPoints() {
      return _hitPoints;
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
      hitPoints : hitPoints,
      damage : damage
    };

  }
};

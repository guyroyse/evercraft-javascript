var Evercraft = Evercraft || {};

Evercraft.Ability = {
  create : function() {

    var _score = 10;

    function score(val) {
      if (val !== undefined) {
        validateScore(val);
        _score = val;
      }
      return _score;
    }

    function modifier() {
      return Math.floor(_score / 2) - 5;
    }

    function validateScore(val) {
      if (!scoreIsValid(val))
        throw "Score must be between 1 and 20";
    }

    function scoreIsValid(val) {
      return val >= 1 && val <= 20;
    }

    return {
      score : score,
      modifier : modifier
    };
  }
}

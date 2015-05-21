describe("Attack", function() {

  var subject, attacker, defender;

  beforeEach(function() {
    attacker = Evercraft.Character.create();
    defender = Evercraft.Character.create();
    subject = Evercraft.Attack.create(attacker, defender);
  });

  describe("when attacking", function() {

    beforeEach(function() {
      spyOn(defender, 'armorClass').and.returnValue(10);
      spyOn(attacker, 'attackDamage').and.returnValue(1);
      spyOn(defender, 'damage');
    });

    describe("and missing", function() {

      beforeEach(function() {
        subject.resolve(5);
      });

      it("doesn't damage the defender", function() {
        expect(defender.damage).not.toHaveBeenCalled();
      });

      it("doesn't grant the attacker experience points", function() {
        expect(attacker.experiencePoints()).toBe(0);
      });

    });

    describe("and hitting", function() {

      beforeEach(function() {
        subject.resolve(15);
      });

      it("damages the defender", function() {
        expect(defender.damage).toHaveBeenCalledWith(1);
      });

      it("grants the attacker 10 experience points", function() {
        expect(attacker.experiencePoints()).toBe(10);
      });

    });

    describe("and critically hitting", function() {

      beforeEach(function() {
        subject.resolve(20);
      });

      it("damages the defender with double damage", function() {
        expect(defender.damage).toHaveBeenCalledWith(2);
      });

      it("grants the attacker 10 experience points", function() {
        expect(attacker.experiencePoints()).toBe(10);
      });

    });

    describe("and the attacker has an attack modifier", function() {

      beforeEach(function() {
        spyOn(attacker, 'attackModifier').and.returnValue(2);
      });

      it("adds the attack modifier to the attack roll", function() {
        expect(hitsOn(8)).toBe(true);
      });

    });

    describe("and attacker is a Rogue", function() {

      beforeEach(function() {
        spyOn(attacker, 'characterClass').and.returnValue('Rogue');
      });

      describe("and it is a critical hit", function() {

        beforeEach(function() {
          subject.resolve(20);
        });

        it("does triple damage", function() {
          expect(defender.damage).toHaveBeenCalledWith(3);
        });

      });

      describe("and defender has a bonus to armor class due to dexterity modifier", function() {

        beforeEach(function() {
          spyOn(defender.dexterity(), 'modifier').and.returnValue(2);
        });

        it("subtracts the dexterity modifier from the armor class for the attack roll", function() {
          expect(hitsOn(8)).toBe(true);
        });

      });

      describe("and defender has a penalty to armor class due to dexterity modifier", function() {

        beforeEach(function() {
          spyOn(defender.dexterity(), 'modifier').and.returnValue(-2);
        });

        it("does not subtract the negative dexterity modifier from the armor class for the attack roll", function() {
          expect(hitsOn(10)).toBe(true);
        });

      });

    });

    describe("and attacker is a Paladin", function() {

      beforeEach(function() {
        spyOn(attacker, 'characterClass').and.returnValue('Paladin');
      });

      describe("and defender is Evil", function() {

        beforeEach(function() {
          spyOn(defender, 'alignment').and.returnValue("EVIL");
        });

        it("add the +2 evil bonus to the attack roll", function() {
          expect(hitsOn(8)).toBe(true);
        });

        describe("and it is a hit", function() {

          beforeEach(function() {
            subject.resolve(15);
          });

          it("adds the +2 evil bonus to the damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(3);
          });

        });

        describe("and it is a critical hit", function() {

          beforeEach(function() {
            subject.resolve(20);
          });

          it("does triple damage include triple the +2 evil bonus", function() {
            expect(defender.damage).toHaveBeenCalledWith(9);
          });

        });

      });

      describe("and defender is not Evil", function() {

        beforeEach(function() {
          spyOn(defender, 'alignment').and.returnValue("GOOD");
        });

        it("doesn't add the +2 evil bonus to the attack roll", function() {
          expect(hitsOn(10)).toBe(true);
        });

        describe("and it is a hit", function() {

          beforeEach(function() {
            subject.resolve(15);
          });

          it("doesn't add the +2 evil bonus to the damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(1);
          });

        });

        describe("and it is a critical hit", function() {

          beforeEach(function() {
            subject.resolve(20);
          });

          it("does double damage and doesn't include double the +2 evil bonus", function() {
            expect(defender.damage).toHaveBeenCalledWith(2);
          });

        });

      });

    });

  });

  function hitsOn(roll) {
    return subject.resolve(roll - 1) === false && subject.resolve(roll) === true && subject.resolve(roll + 1) === true;
  }

});

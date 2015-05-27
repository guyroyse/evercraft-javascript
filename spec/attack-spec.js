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
      spyOn(attacker, 'attackModifier').and.returnValue(0);
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
        attacker.attackModifier.and.returnValue(2);
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
          spyOn(defender, 'dexterityModifier').and.returnValue(2);
        });

        it("subtracts the dexterity modifier from the armor class for the attack roll", function() {
          expect(hitsOn(8)).toBe(true);
        });

      });

      describe("and defender has a penalty to armor class due to dexterity modifier", function() {

        beforeEach(function() {
          spyOn(defender, 'dexterityModifier').and.returnValue(-2);
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

    describe("and attacker is a Dwarf", function() {

      beforeEach(function() {
        spyOn(attacker, 'race').and.returnValue('Dwarf');
      });

      describe("and defender is an Orc", function() {

        beforeEach(function() {
          spyOn(defender, 'race').and.returnValue("Orc");
        });

        it("adds a +2 bonus to the attack roll", function() {
          expect(hitsOn(8)).toBe(true);
        });

        describe("and it is a hit", function() {

          beforeEach(function() {
            subject.resolve(15);
          });

          it("adds a +2 bonus to the damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(3);
          });

        });

        describe("and it is a critical hit", function() {

          beforeEach(function() {
            subject.resolve(20);
          });

          it("does doubles the +2 bonus to damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(6);
          });

        });

      });

      describe("and defender is not an Orc", function() {

        beforeEach(function() {
          spyOn(defender, 'alignment').and.returnValue("GOOD");
        });

        it("doesn't add a +2 bonus to the attack roll", function() {
          expect(hitsOn(10)).toBe(true);
        });

        describe("and it is a hit", function() {

          beforeEach(function() {
            subject.resolve(15);
          });

          it("doesn't add a +2 bonus to the damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(1);
          });

        });

        describe("and it is a critical hit", function() {

          beforeEach(function() {
            subject.resolve(20);
          });

          it("does double damage and doesn't include a doubled +2 bonus", function() {
            expect(defender.damage).toHaveBeenCalledWith(2);
          });

        });

      });

    });

    describe("and attacker is a Dwarven Paladin", function() {

      beforeEach(function() {
        spyOn(attacker, 'characterClass').and.returnValue('Paladin');
        spyOn(attacker, 'race').and.returnValue('Dwarf');
      });

      describe("and defender is an Evil Orc", function() {

        beforeEach(function() {
          spyOn(defender, 'race').and.returnValue("Orc");
          spyOn(defender, 'alignment').and.returnValue("EVIL");
        });

        it("adds a +2 evil bonus and +2 dwarven bonus to the attack roll", function() {
          expect(hitsOn(6)).toBe(true);
        });

        describe("and it is a hit", function() {

          beforeEach(function() {
            subject.resolve(15);
          });

          it("adds a +2 evil bonus and +2 dwarven bonus to the damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(5);
          });

        });

        describe("and it is a critical hit", function() {

          beforeEach(function() {
            subject.resolve(20);
          });

          it("does triples the +2 evil bonus and the +2 dwarven bonus to damage", function() {
            expect(defender.damage).toHaveBeenCalledWith(15);
          });

        });

      });

    });

  });

  function hitsOn(roll) {
    return subject.resolve(roll - 1) === false && subject.resolve(roll) === true && subject.resolve(roll + 1) === true;
  }

});

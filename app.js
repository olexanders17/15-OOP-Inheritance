function Casino(qty, money) {
    this.initCountSM = qty;
    this.money = money;
    this.slotMachines = [];
    this.id = 0;


    //initial fill by slots
    this.init = function () {
        var qty = this.initCountSM || 1;
        for (var i = 1; i <= qty; i++) {
            var el = new SlotMachine(Math.floor(money / qty));
            el.id = this.id + i;
            this.slotMachines.push(el);
        }

        //Math.round(Math.random() * this.slotMachines.length);
        this.slotMachines[0].isLucky = true;

    }

    this.getMoneyAmountCasino = function () {

        return this.money;
    }

    this.getQtySM = function () {
        return this.slotMachines.length;
    }


    this.addSM = function () {
        var startMoney = _findMaxMoneyInSM(this.slotMachines).money;
        var sm = new SlotMachine(startMoney);
        sm.id = this.id + 1;
        this.slotMachines.push(sm);
        _updateBlance();

    }


    var _updateBlance = function (add) {
        var add = add || 0
        this.money = 0;

        for (var i = 0; i < this.slotMachines.length; i++) {
            this.money += this.slotMachines[i].money;
        }

        this.money += add;

    }.bind(this);

    var _findMaxMoneyInSM = function (slotMachines) {
        var obj = _.max(slotMachines, function (el) {
            return el.money;
        });
        return obj
    }.bind(this);


    this.deleteSM = function (id) {

        if (this.slotMachines.length = 0) {
            console.log("you can not delete slot machine because 0 machines available");
            return;
        }

        for (var i = 0; i < this.slotMachines.length; i++) {
            if (this.slotMachines[i].id == id) {
                var moneyForAllocate = this.slotMachines[i].money;
                this.slotMachines.splice(i, 1);
                _updateBlance();
                return;
            }
        }
        console.log("can not find slot machine with id=", id);


    };


    this.withdraw = function (money) {
        var reducedMoney = money || 0;

        if (reducedMoney > this.money) {
            console.log("There are not enoth money max available amount is ", this.money);
            return;
        }

        if (this.slotMachines.length == 0) {
            this.money -= reducedMoney;
            return this.money;
        }

        while (reducedMoney >= 0) {
            var obj = _findMaxMoneyInSM(this.slotMachines)

            if (obj.money > reducedMoney) {
                this.slotMachines.forEach(function (el) {
                    if (el.id == obj.id) {
                        el.money -= reducedMoney;
                        reducedMoney = 0;
                    }
                })

            } else {
                this.slotMachines.forEach(function (el) {
                    if (el.id == obj.id) {

                        reducedMoney -= el.money;
                        el.money = 0;
                    }
                })


            }
        }

        this.money -= reducedMoney;


    }


    this.init.call(this);
}

function SlotMachine(money) {
    this.money = money;
    this.playerMoney = 0;
    this.isLucky = false;
    this.bid = 10;
    this.id;


    this.getMoney = function () {
        return this.money;
    }

    this.withdraw = function (playerMoney) {
        this.playerMoney -= playerMoney;
    }

    this.putMoney = function (playerMoney) {
        this.playerMoney += playerMoney;
    }

    this.doGame = function (bid) {
        this.bid = bid || 10

        var rn1 = Math.floor(Math.random() * 9);
        var rn2 = Math.floor(Math.random() * 9);
        var rn3 = Math.floor(Math.random() * 9);

        console.log("doGame :", "SM=", this);
        console.log("doGame :", "rn1=", rn1);
        console.log("doGame :", "rn2=", rn2);
        console.log("doGame :", "rn3=", rn3);


        var winAmount = 0;

        this.money += this.bid;
        this.playerMoney -= this.bid;

        if (rn1 == rn2 == rn3 == 7) {
            console.log("three 777 ");

            winAmount = this.money;
            this.playerMoney = winAmount;
            this.money = 0;
        }
        else if ((rn1 == rn2) && (rn1 == rn3) && (rn2 == rn3) && (this.isLucky)) {
            console.log("lucky three");
            winAmount = this.money;
            this.playerMoney = winAmount;
            this.money = 0;

        }

        else if ((rn1 == rn2) && (rn1 == rn3) && (rn2 == rn3)) {
            console.log("three win");
            winAmount = this.bid * 5;
            this.playerMoney += winAmount;
            this.money -= winAmount;

        }

        else if ((rn1 == rn2) || (rn1 == rn3) || (rn2 == rn3)) {
            console.log("two win ");

            winAmount = this.bid * 2;
            this.playerMoney += winAmount;
            this.money -= winAmount;

        }

        console.log("doGame :", "winAmount=", winAmount);
        console.log("doGame :", "playerMoney=", this.playerMoney);
        console.log("doGame :", "money=", this.money);
        var rezult = {
            rn1: rn1,
            rn2: rn2,
            rn3: rn3,
            winAmount: winAmount
        };


        return rezult;

    }

}

var casino = new Casino(2, 500);
var sm1 = casino.slotMachines[0];
var sm2 = casino.slotMachines[1];

console.log("player puts money");
sm1.putMoney(500);
sm2.putMoney(400);




var playGameCount = 10;
console.log("Play couple games", playGameCount);
for (var j = 0; j < playGameCount; j++) {

    for (var i = 0; i < casino.slotMachines.length; i++) {
        console.log("do game", casino.slotMachines[i].doGame());
    }

}



casino.addSM();
casino.addSM();

console.log("casino", casino);
console.log("delete Slot machine");
casino.deleteSM(1);
console.log("casino", casino);

console.log("casion show money", casino.getMoneyAmountCasino());
console.log("casion withdraw money", 200);
casino.withdraw(200);

console.log("casion show money", casino.getMoneyAmountCasino());












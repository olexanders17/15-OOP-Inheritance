function Casino(qty, money) {
    this.countSM = qty;
    this.money = money;
    this.slotMachines = [];
    this.id = 0;


    //initial fill by slots
    this.init = function () {
        for (var i = 1; i <= qty; i++) {
            var el = new SlotMachine(money / qty + 10 * i);
            el.id = this.id + i;
            this.slotMachines.push(el);
        }

        this.slotMachines[0].isLucky = true;

    }

    this.getMoneyAmountCasino = function () {
        return money;
    }

    this.getQtySM = function () {
        return this.slotMachines.length;
    }

    this.addSM = function () {

    }

    var _findMaxMoneyInSM = function (slotMachines) {
        var obj = _.max(slotMachines, function (el) {
            return el.money;
        });
        return obj
    }.bind(this);

    //done
    this.deleteSM = function (index) {
        var elToDelete;
        this.slotMachines.splice(index, 1);
    }

    //DONE
    this.withdraw = function (money) {
        var reducedMoney = money;

        while (reducedMoney > 0) {
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

        this.money -= money;


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
        else if (rn1 == rn2 == rn3) {
            console.log("three other ");
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
/*
 var casino = new Casino(3, 100);
 var sm = casino.slotMachines[0];
 sm.putMoney(500);

 console.log("do game", casino.slotMachines[0].doGame());

 //console.log("casino", casino);
 */


var spanBalance = document.querySelector('#balance');
var spinButton = document.querySelector('#spin');
var putButton = document.querySelector('#put');
var putInput = document.querySelector('#put-input')
var startButton = document.querySelector('#start');
var betInput = document.querySelector('#bet');
var winInput = document.querySelector('#win-input');
var number1 = document.querySelector('#n1');
var number2 = document.querySelector('#n2');
var number3 = document.querySelector('#n3');


var casino;
var sm1;


startButton.addEventListener('click', function () {

    casino = new Casino(3, 100);
    sm1 = casino.slotMachines[0];
    console.log(" :", "casino=", casino);
})


startButton.click();
betInput.value = sm1.bid;

putButton.addEventListener('click', function (e) {
    sm1.putMoney(+putInput.value);
    spanBalance.textContent = sm1.playerMoney;


})

spinButton.addEventListener('click', function (e) {
    var gameRezult=sm1.doGame();
    number1.textContent =gameRezult.rn1;
    number2.textContent =gameRezult.rn2;
    number3.textContent =gameRezult.rn3;
        spanBalance.textContent = sm1.playerMoney;
    winInput.value = gameRezult.winAmount;


})





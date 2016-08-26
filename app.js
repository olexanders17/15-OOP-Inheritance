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

        this.slotMachines[0].isLucky=true;

    }

    this.getMoneyAmountCasino = function () {
        return money;
    }

    this.getQtySM = function () {
        return this.slotMachines.length;
    }

    this.addSM = function () {

    }

    this.findMaxMoneyInSM = function (slotMachines) {
        return slotMachines[1];
    }

    //done
    this.deleteSM = function (index) {
        var elToDelete;
        this.slotMachines.splice(index, 1);
    }

        //DONE
    this.withdraw = function (money) {
        var reducedMoney = money;


        while (reducedMoney > 0) {
            var obj = _.max(this.slotMachines, function (el) {
                return el.money;
            });

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
    this.isLucky=false;
    this.id;

    this.getMoney=function () {
        return this.money;
    }
    
    this.withdraw=function (money) {
        this.money-=money;
    }

    this.putMoney=function (money) {
        this.money+=money;
    }
    
    this.doGame=function () {

    }
    

}


var casino = new Casino(3, 100);

console.log(casino.slotMachines[0]);
console.log(casino.slotMachines[0].withdraw(5));
console.log(casino.slotMachines[0]);




console.log("casino", casino);



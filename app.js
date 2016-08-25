function Casino(qty, money) {
    this.countSM = qty;
    this.money = money;
    this.slotMachines = [];
    this.id=0;

    //initial fill by slots
    this.init = function () {
        for (var i = 1; i <= qty; i++) {
            var el=new SlotMachine(money / qty);
            el.id=this.id+1;
            this.slotMachines.push(el);
        }

    }

    this.getMoneyAmount = function () {
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

    this.deleteSM = function (index) {
        var elToDelete;
        this.slotMachines.splice(index, 1);
    }


    this.withdraw = function (money) {

    }


}

function SlotMachine(money) {
    this.money = money;
    this.id;
}


var casino = new Casino(3, 100);
casino.init();
//casino.deleteSM(1);

console.log("casino", casino);



var Customer = /** @class */ (function () {
    function Customer(id) {
        this.id = id;
    }
    Customer.prototype.fooBar = function () {
        var _this = this;
        setTimeout(function () {
            console.log('ID', _this.id);
        }, 2000);
        return '';
    };
    return Customer;
}());
var myCustomer = new Customer(5);
console.log(myCustomer);
myCustomer.fooBar();
/*
const foo = function(arg) {
    this......
    return arg + 1;
}

const foo2 = arg => arg + 1;


foo2(1);*/ 
//# sourceMappingURL=main.js.map
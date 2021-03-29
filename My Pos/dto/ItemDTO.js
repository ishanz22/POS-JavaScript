

function ItemDTO(code, name, qty, price) {
    var __code = code;
    var __name = name;
    var __qty  = qty;
    var __price = price;

this.getItemCode = function () {
    return __code;
}
this.getItemName = function () {
    return __name;
}
this.getItemQty = function () {
    return __qty;
}
this.getItemPrice = function () {
    return __price;
}
this.setItemCode = function (newCode) {
    __code = newCode;
}
this.setItemName = function (newName) {
    __name = newName;
}
this.setItemQty = function (newQty) {
    __qty = newQty;
}
this.setPrice = function (newPrice) {
    __price = newPrice;
}


}
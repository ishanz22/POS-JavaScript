function OrderDTO(oID, oDate, iCode, iName, iPrice, iQty, total) {
    var __oID = oID;
    var __oDate = oDate;
    var __iCode = iCode;
    var __iName = iName;
    var __iqTY = iQty;
    var __iPrice = iPrice;
    var __total = total;

    this.getOrderID = function () {
        return __oID;
    }

    this.getOrderDate = function (){
        return __oDate;
    }

    this.getItemCodeOr = function () {
        return __iCode;
    }

    this.getItemNameOr = function () {
        return __iName;
    }

    this.getItemQtyOr = function () {
        return __iqTY;
    }

    this.getItemPriceOr = function () {
        return __iPrice;
    }

    this.getTotal = function () {
        return __total;
    }

    this.setOrderIdOr = function (newOId) {
        __oID = newOId;
    }

    this.setOrderDateOr = function (newDate) {
        __oDate = newDate;
    }

    this.setItemCodeOr = function (newICode) {
        __iCode = newICode;
    }

    this.setINameOr = function (newIName) {
        __iName = newIName;
    }

    this.setItemQtyOr = function (newIQty) {
        __iqTY = newIQty;
    }

    this.setItemPriceOr = function (newIPrice) {
        __iPrice = newIPrice;
    }

    this.setTotal = function (newTotal) {
        __total = newTotal;
    }
}

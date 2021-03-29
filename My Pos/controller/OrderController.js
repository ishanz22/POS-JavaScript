function addValuesToCmbCus(value) {
    let cusID = $('#selectCusID');
    $(cusID).append(value)
}
function addItemToCmbCus(value) {
    let itemID = $('#selectItemCode');
    $(itemID).append(value)
}

//Generate Order ID/
function generateOrderID() {
    try {
        let lastOrderId = orderTable[orderTable.length-1].getOrderID();
        let newOrderId = parseInt(lastOrderId.substring(1,4))+1;
        if (newOrderId < 10) {
            $("#txtOrderID").val("OID-00"+newOrderId);
        }else if (newOrderId < 100) {
            $("#txtOrderID").val("OID-0"+newOrderId);
        } else {
            $("#txtOrderID").val("OID-"+newOrderId);
        }
    } catch (e) {
        $("#txtOrderID").val("OID-001");
    }

}
generateOrderID();

// function generateOrderDate() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//
//     today = mm + '/' + dd + '/' + yyyy;
//     $('#txtDate').val(today);
// }
//
// generateOrderDate();



$('#selectCusID').click(function () {

    var id = $('#selectCusID option:selected').text();
    var customer = searchCustomer(id);
    if (customer != null) {
        $('#orderCustomerID').val(customer.getCustomerID());
        $('#orderCustomerName').val(customer.getCustomerName());
        $('#orderCustomerAddress').val(customer.getCustomerAddress());
        $('#orderCustomerSalary').val(customer.getCustomerSalary());
    } else {
        alert(" error");
    }
});

$('#selectItemCode').click(function () {

    var code = $('#selectItemCode option:selected').text();
    var item = searchItem(code);
    if (item != null) {
        $('#txtItemCode1').val(item.getItemCode());
        $('#txtItemDescription1').val(item.getItemName());
        $('#txtItemPrice1').val(item.getItemQty());
        $('#txtQTYOnHand1').val(item.getItemPrice());
    } else {
        alert(" error");
    }
});


$('#btnAddToTable').click(function () {
    var price = $('#txtItemPrice').val()
    var orderQty = $('#txtQty').val()
    var total = (parseInt(price)*parseInt(orderQty));
    $('#total').text(total)
    var newTot = $('#total').val();
    var subTot=0;
    subTot = total+parseInt(newTot);
    $('#subtotal').text(subTot)

})


///////////////////////////////////////////////////////////////////////////

$('#btnAddToTable').click(function () {
    let price = $('#txtItemPrice1').val()
    let orderQty = $('#txtQty').val()

    let total = (parseInt(price) * parseInt(orderQty));

    $('#total').text(total)
    let newTotal = $('#total').val();

    let subTot = (total + parseInt(newTotal));
    $('#subtotal').text(subTot)
})

$('#btnSubmitOrder').click(function () {
    let oID = $('#txtOrderID').val();
    let date = $('#txtDate').val();
    let code = $('#txtItemCode1').val();
    let desc = $('#txtItemDescription1').val();
    let price = $('#txtItemPrice1').val();
    let qty = $('#txtQty').val();
    let total = $('#total').val();

    let order = saveOrder(oID, date, code, desc, price, qty, total)
    if (order) clear();

})

function getAllOrders() {
    return orderTable;
}

function saveOrder(oId, oDate, iCode, iName, iQty, iPrice, total) {
    let orderDTO = new OrderDTO(oId, oDate, iCode, iName, iPrice, iQty, total);
    orderTable.push(orderDTO);

    loadAllOrders()
    return true;

}

function loadAllOrders() {
    let allOrders = getAllOrders();
    $('#orderTable').empty();

    for (var i in allOrders) {
        let code = allOrders[i].getItemCodeOr();
        let name = allOrders[i].getItemNameOr();
        let qty = allOrders[i].getItemQtyOr();
        let price = allOrders[i].getItemPriceOr();
        let total = allOrders[i].getTotal();

        let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td><td>${total}</td></tr>`;
        $('#orderTable').append(row);
    }
}

function clear() {
    $('#txtItemCode1').val("");
    $('#txtItemDescription1').val("");
    $('#txtQTYOnHand1').val("");
    $('#txtItemPrice1').val("");
    $('#total').val("");
    $('#orderCustomerID').val("");
    $('#orderCustomerName').val("");
    $('#orderCustomerAddress').val("");
    $('#orderCustomerSalary').val("");
    $('#txtQty').val("");
}
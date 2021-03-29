$('#btnItem').click(function () {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty  = $("#txtItemQty").val();
    let itemPrice= $("#txtItemPrice").val();


    let res = saveItem(itemCode, itemName, itemQty, itemPrice);
    if(res)clearAllItemText();
  });

//load all items
$("#btnGetAll").click(function () {
    loadAllItemToTable()
});

$("#btnItemDelete").click(function () {
    let itemCode = $("#txtItemCode").val();
    let option=confirm(`Do you want to delete ID:${itemCode}`);

    if (option){
        let res=deleteItem(itemCode);
        if (res){
            alert("Item deleted");
        }else{
            alert("delete failed")
        }
    }

    loadAllItemToTable();
    clearAllItemText();

});

$("#btnItemUpdate").click(function () {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty  = $("#txtItemQty").val();
    let itemPrice= $("#txtItemPrice").val();

    let option=confirm(`Do You Want to Update Item ID:${itemCode} `);

    if (option){
        let res = updateItem(itemCode,itemName,itemQty,itemPrice);
        if (res){
            alert("Item Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllItemToTable();
    clearAllItemText();
});

$("#txtItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter"){
        let item = searchItem($(this).val());
        if (item != null){
            $("#txtItemCode").val(item.getItemCode());
            $("#txtItemName").val(item.getItemName());
            $("#txtItemQty").val(item.getItemQty());
            $("#txtItemPrice").val(item.getItemPrice());
        }else{
            clearAllItemText();
        }
    }
});

//==================validation========================================

//item-code
let itemRegEx = /^(i-)[0-9]{1,3}$/
$('#txtItemCode').on('keyup',function (event) {
    if(event.key == 'Enter'){
        $('#txtItemName').focus();
    }
    let id = $('#txtItemCode').val();
    if(itemRegEx.test(id)){
        $('#txtItemCode').css('border','2px solid green')
        $('#lblCode').text('');
    }else {
        $('#txtItemCode').css('border','2px solid red');
        $('#lblCode').text('your input format is invalid ex:(i-001)').css('color', 'red');
    }
});

//item-name
let itemName =/^[A-Za-z]+$/
$('#txtItemName').on('keyup',function (event) {
    if(event.key == 'Enter'){
        $('#txtItemQty').focus();
    }
    let name = $('#txtItemName').val();
    if(itemName.test(name)){
        $('#txtItemName').css('border', '2px solid green');
        $('#lblname').text('')
    }else{
        $('#txtItemName').css('border', '2px solid red');
        $('#lblname').text('Item Name must have alphabet characters only').css('color', 'red');
    }
});

//item-QTY
let itemQTY = /^[0-9]+$/
$('#txtItemQty').on('keyup',function (event) {
    if (event.key=='Enter'){
        $('#txtItemPrice').focus();
    }
    let qty = $('#txtItemQty').val();
    if (itemQTY.test(qty)){
        $('#txtItemQty').css('border', '2px solid green');
        $('#lblqty').text('');
    }else{
        $('#txtItemQty').css('border', '2px solid red');
        $('#lblqty').text('Item Quantity must have numeric characters only').css('color', 'red');

    }
});

//Unit-price
let itemUnitPrice = /^\d{1,9}\.\d{0,2}$/
$('#txtItemPrice').on('keyup',function (event) {
    if(event.key == 'Enter'){
        let itemCode = $('#txtItemCode').val();
        let itemName = $('#txtItemName').val();
        let itemQty = $('#txtItemQty').val();
        let itemPrice = $('#txtItemPrice').val();

        let res = saveItem(itemCode,itemName,itemQty,itemPrice);
        if (res) clearAllItemText();

        $('#txtItemCode').focus();
    }
    let unit = $('#txtItemPrice').val();
    if (itemUnitPrice.test(unit)){
        $('#txtItemPrice').css('border', '2px solid green')
        $('#lblprice').text('')
    }else{
        $('#txtItemPrice').css('border', '2px solid red')
        $('#lblprice').text('invalid format ex:(10000000.00)').css('color', 'red');
    }
});

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keydown',function (event) {
    if(event.key=='Tab'){
        event.preventDefault();
    }
});
// ============== validation Ends ========================










/////
//save item
function saveItem(code, name, qty, price) {
    let item = new ItemDTO(code,name,qty,price);
    itemTable.push(item);

    //load the table
    loadAllItemToTable();
    return true;
    }

    //get all Items
    function getAllItems() {
        return itemTable;
    }

    //delete Items
    function deleteItem(itemCode) {
            let item = searchItem(itemCode);
            if (item !=null){
                let indexNumber = itemTable.indexOf(item);
                itemTable.splice(indexNumber,1);
                return true;
            }else{
                return false;
            }
    }



    // search Item
    function searchItem(code) {
        for (var i in itemTable){
            if (itemTable[i].getItemCode() == code) return itemTable[i];
        }
        return null;

}

function updateItem(code, name, qty, price) {
    let item = searchItem(code);
    if (item !=null){
       // item.setItem(code)
        item.setItemName(name);
        item.setItemQty(qty);
        item.setPrice(price)
        return true;
    }else {
        return false;
    }
}
///=========================================
//other function
function loadAllItemToTable() {
    let allItems = getAllItems();
    $('#tblItem').empty();
    for (var i in allItems){
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qty =allItems[i].getItemQty();
        let price = allItems[i].getItemPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
        addItemToCmbCus(`<option>${code}</option>`);
        $('#tblItem').append(row);
    }
}
function clearAllItemText() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("")
    $("#txtItemQty").val("");
    $("#txtItemPrice").val("");
}






//======================================================================================
$('#btnCustomer').click(function () {
    let cusID = $("#txtCustomerID").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalry").val();

    let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
    if (res) clearAllCustomerText();
});

//load all customers
$("#btnGetAll").click(function () {
    loadAllCustomerToTheTable();
});


$("#btnCusDelete").click(function () {
    let cusID = $("#txtCustomerID").val();
    let option = confirm(`Do you want to delete ID:${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$("#btnUpdate").click(function () {
    let cusID = $("#txtCustomerID").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalry").val();

    let option = confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option) {
        let res = updateCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Faild");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

$("#txtCustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {

        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#txtCustomerID").val(customer.getCustomerID());
            $("#txtCustomerName").val(customer.getCustomerName());
            $("#txtCustomerAddress").val(customer.getCustomerAddress());
            $("#txtCustomerSalry").val(customer.getCustomerSalary());
        } else {
            clearAllCustomerText();
        }
    }
});
//==================validation===================================================

let cusRegEx = /^(C00-)[0-9]{1,3}$/
$('#txtCustomerID').on('keyup', function (event) {

    if (event.key == 'Enter') {
        $('#txtCustomerName').focus();
    }

    let id = $('#txtCustomerID').val();
    if (cusRegEx.test(id)) {
        $('#txtCustomerID').css('border', '2px solid green')
        $('#lblcusid').text('')
    } else {
        $('#txtCustomerID').css('border', '2px solid red')
        $('#lblcusid').text('your input format is invalid ex:(C00-001)');
    }
})

let cusName = /^([A-Za-z])+( [A-Za-z]+)$/
$('#txtCustomerName').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtCustomerAddress').focus()
    }
    let name = $('#txtCustomerName').val();
    if (cusName.test(name)) {
        $('#txtCustomerName').css('border', '2px solid green')
        $('#lblcusname').text('')
    } else {
        $('#txtCustomerName').css('border', '2px solid red')
        $('#lblcusname').text('invalid format ex:(First Last)');
    }
})

let cusAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/
$('#txtCustomerAddress').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtCustomerSalry').focus()
    }
    let address = $('#txtCustomerAddress').val();
    if (cusAddress.test(address)) {
        $('#txtCustomerAddress').css('border', '2px solid green')
        $('#lblcusaddress').text('')
    } else {
        $('#txtCustomerAddress').css('border', '2px solid red')
        $('#lblcusaddress').text('invalid format ex:(House No.-780)').css('color', 'red');
    }
})

let cusSalary = /^\d{1,9}\.\d{0,2}$/
$('#txtCustomerSalry').on('keyup', function (event) {

    if (event.key == 'Enter') {
        let cusID = $("#txtCustomerID").val();
        let cusName = $("#txtCustomerName").val();
        let cusAddress = $("#txtCustomerAddress").val();
        let cusSalary = $("#txtCustomerSalry").val();

        let res = saveCustomer(cusID, cusName, cusAddress, cusSalary);
        if (res) clearAllCustomerText();

        $('#txtCustomerID').focus()
    }
    let salary = $('#txtCustomerSalry').val();
    if (cusSalary.test(salary)) {
        $('#txtCustomerSalry').css('border', '2px solid green')
        $('#lblcussalary').text('')
    } else {
        $('#txtCustomerSalry').css('border', '2px solid red')
        $('#lblcussalary').text('invalid format ex:(10000000.00)').css('color', 'red');
    }
})

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalry').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});
// ============== validation Ends ========================


//Functions - CRUD operations
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    customerTable.push(customer);// customer aded

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

//get all customers
function getAllCustomers() {
    return customerTable;
}

//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search customer
function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}


function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}

// ==============================================================================

//Other function
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        addValuesToCmbCus(`<option>${id}</option>`)
        $('#tblCustomer').append(row);

    }
}

function clearAllCustomerText() {
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalry").val("");
}


let user = function (firstName, lastName, userName, password, sex, mobile) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.sex = sex;
    this.mobile = mobile;
}
let allSet = false;

function signUp() {
    $(document).ready(function () {
        let firstName = $('#firstName').val();
        let userName = $('#userName').val();
        let lastName = $('#lastName').val();
        let password = $('#pass').val();
        let passwordCom = $('#passCom').val();
        let mobile = $('#mobile').val();
        if (password === passwordCom) {
            let gender = "";
            if ($('#male').prop('checked')) {
                gender = 'male';
            } else gender = female;
            let a = new user(firstName, lastName, userName, password, gender, mobile);
            if (allSet = true) {
                $.ajax({
                    type: 'POST',
                    url: "http://localhost:3000/api/addUser",
                    data: a,
                    success: function (data) {
                        if (data === "username exists") {
                            return alert('username already exists');
                        }
                        return window.location.replace("http://localhost:3000/api/login");
                    },
                    error: function (data) {
                        console.log(data);
                    }
                })
            }
        }
    })
}

function handle(id) {
    let firstName = $('#firstName').val();
    let userName = $('#userName').val();
    let lastName = $('#lastName').val();
    let password = $('#pass').val();
    let passwordCom = $('#passCom').val();
    let mobile = $('#mobile').val();
    let male = $('#male').prop('checked');
    let female = $('#female').prop('checked');
    if (id === "firstName") {
        if (firstName === "") {
            $('#firstNameP').html("required");
            allSet = false;
        } else if (firstName.length < 3) {
            $('#firstNameP').html("Last Name must be at least 3 charachters");
            allSet = false;
        } else {
            allSet = true;
            $('#firstNameP').html("");
        }
    }
    if (id === "lastName") {
        if (firstName === "") {
            $('#lastNameP').html("required");
            allSet = false;
        } else if (lastName.length < 3) {
            $('#lastNameP').html("Last Name must be at least 3 charachters");
            allSet = false;
        } else {
            allSet = true;
            $('#lastNameP').html("");
        }
    }
    if (id === "userName") {
        if (userName === "") {
            $('#usernameP').html("required");
            allSet = false;
        } else if (userName.length < 3) {
            $('#usernameP').html("userName must be at least 3 charachters");
            allSet = false;
        } else {
            allSet = true;
            $('#usernameP').html("");
        }
    }
    if (id === "pass") {
        if (password === "") {
            $('#passP').html("required");
            allSet = false;
        } else if (password.length < 8) {
            $('#passP').html("password must be at least 8 charachters");
            allSet = false;
        } else {
            allSet = true;
            $('#passP').html("");
        }
    }
    if (id === "passCom") {
        if (passwordCom === "") {
            $('#passComP').html("required");
            allSet = false;
        } else if (passwordCom != password) {
            $('#passComP').html("passwords not match");
            allSet = false;
        } else {
            allSet = true;
            $('#passComP').html("");
        }
    }
    if (id === "mobile") {
        if (mobile === "") {
            $('#mobileP').html("required");
            allSet = false;
        } else if (mobile.length < 8) {
            $('#mobileP').html("Last Name must be at least 8 numbers");
            allSet = false;
        } else {
            allSet = true;
            $('#mobileP').html("");
        }
    }
    if (id === "male" || id === 'female') {

        if (!male && !female) {
            $('#sexP').html("required");
            allSet = false;
        } else {
            allSet = true;
            $('#sexP').html("");
        }
    }

}

function mySubmitFunction() {
    return false;
}
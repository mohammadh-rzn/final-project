let passEdited = false;

function openEdit() {
    $(document).ready(function () {
        $('.editMe').css('display', 'none');
        $('.edit').css('display', 'block');
        $('.userInfo').prop('disabled', false);
        $('.editp').css('display', 'none');
    })
}

function openEditP() {
    passEdited = true;
    $(document).ready(function () {
        $('.editp').css('display', 'none');
        $('.edit').css('display', 'block');
        $('.editMe').css('display', 'none');
        $('.userInfoP').prop('disabled', false);
        $('.userInfoP').css('display', 'block');
    })
}

function cancel() {
    passEdited = false;
    $(document).ready(function () {
        $('.editp').css('dispaly', 'block');
        $('.editMe').css('display', 'block');
        $('.edit').css('display', 'none');
        $('.userInfoP').css('display', 'none');
        $('.userInfoP').prop('disabled', true);
        $('.userInfo').prop('disabled', true);
        $('#EditPassword').css('display', 'block');
    })
}

function Edit() {
    $(document).ready(function () {
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let userName = $('#userName').val();
        let sex = $('#sex').val();
        let moblie = $('#moblie').val();
        let password = $('#pass').val();
        let confirmPass = $('#cpass').val();
        let sessionId = $('.sessionId').val();
        if (passEdited) {
            if (password != confirmPass) {
                alert("passwords not match");
            } else if (password.length < 8) {
                alert('password must be at least 8 characters')
            } else {
                let a = {password : password};
                $.ajax({
                    url: 'http://localhost:3000/users/editP/' + sessionId,
                    type: 'PUT',
                    data: a,
                    success(data){
                        alert('password changed successfully redirecting to login page')
                        window.location.replace('http://localhost:3000/api/login');
                    },
                    error(err){
                        alert('somthing went wrong');
                    }
                })
            }
        }
        else{
            let a = {};
            a.firstName = firstName;
            a.lastName = lastName;
            a.userName = userName;
            a.sex = sex;
            a.moblie = moblie;
            $.ajax({
                url: 'http://localhost:3000/users/edit/' + sessionId,
                type: 'PUT',
                data: a,
                success(data){
                    alert(' userInfo changed successfully reloading')
                    window.location.reload();
                },
                error(err){
                    alert('somthing went wrong');
                }
            })
        }
    })
}
function submitIt(){
    $(document).ready(function(){
        $('#imgUp').submit();
    })
}
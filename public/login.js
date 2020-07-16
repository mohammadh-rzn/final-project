function login(){
    $(document).ready(function(){
        $.ajax({
            type:'POST',
            url: 'http://localhost:3000/api/loginCheck',
            data: {
                username: $('#username').val(),
                password: $('#pass').val()
            },
            success: function(data){
                if(data === "correct"){
                    alert("You are successfully loged in")
                    window.location.replace("http://localhost:3000/api/dashboard");
                }
                else{
                    console.log(data);
                    alert('incorrect username or password ');
                }
            },
            error: function(data){
                console.log(data);
            }
        })
    })
}
function mySubmitFunction(){
    return false;
}
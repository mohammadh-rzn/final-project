function deleteThis(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/users/delete/" + id,
            success: function(data){
                if(data != 'something went wrong'){
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:3000/articles/deleteUserArticles/" + id,
                        success: function(data){
                            if(data != 'something went wrong'){
                                $.ajax({
                                    type: "DELETE",
                                    url: "http://localhost:3000/articles/deleteUserComments/" + id,
                                    success: function(data){
                                        if(data != 'something went wrong'){
                                            window.location.reload();
                                        }
                                        else console.log(data);
                                    },
                                    error: function(err){
                                        console.log(err);
                                    }
                                })
                                
                            }
                            else console.log(data);
                        },
                        error: function(err){
                            console.log(err);
                        }
                    })
                   
                }
                else console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        })
    })
}
function resetpass(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/users/resetPass/" + id,
            success: function(data){
                if(data != 'something went wrong'){
                    alert(data);
                }
                else console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        })
    })
}
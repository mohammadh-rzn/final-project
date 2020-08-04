
function readmore(id){
    window.location.replace('http://localhost:3000/articles/get/'+ id);
}
function deleteThis(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/articles/delete/" + id,
            success: function(data){
                if(data != 'something went wrong'){
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:3000/articles/deleteArticleComments/" + id,
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
    })
}
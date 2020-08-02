function readmore(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        console.log(id);
        window.location.replace('http://localhost:3000/articles/get/'+ id);
    })
    
}
function edit(obj){
    
    $(document).ready(function(){
        let id = $(obj).attr('class');
        console.log(id);
        window.location.replace('http://localhost:3000/articles/edit/'+ id);
    })
    
}
function deleteThis(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/articles/delete/" + id,
            success: function(data){
                if(data != 'something went wrong'){
                    window.location.replace('http://localhost:3000/articles/myArticles');
                }
                else console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        })
    })
}

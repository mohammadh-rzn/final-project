tinymce.init({
    selector: 'textarea', // change this value according to your HTML
    plugins: "link image code",
  toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code | fontsizeselect'
});
function save(){
    $(document).ready(function(){
        let text = tinymce.activeEditor.getContent();
        let title = $('#title').val();
        let a = {};
        a.text = text;
        a.title = title;
        a.author = $('#sessionId').val();
        a.rawText =  tinymce.activeEditor.getContent({ format: "text" });
        console.log(a);
        $.ajax({
            type: 'POST',
            url:'http://localhost:3000/articles/add',
            data: a,
            success:function(data){
                if(data != 'something went wrong');
                window.location.replace('http://localhost:3000/articles/myArticles');
            },
            error: function(err){
                console.log(err);
            }

        })
    })
  
}
function submitIt(){
    $(document).ready(function(){
        $('#imgUp').submit();
    })
}
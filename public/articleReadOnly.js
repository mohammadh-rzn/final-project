// Move focus to specific element
tinymce.init({
    selector: "#tiny",  // change this value according to your HTML
    plugins: "noneditable",
    menubar: false,
    toolbar: false,
    readonly: 1
  });
  function send() {

    let s = document.getElementById('text').value;
    let textl = s.length;
    let spaceh = 0;
    let brh = 0;
    for (let j = 0; j < textl; j++) {
      let a = s.charAt(j);
      if (a === ' ') {
        spaceh = j;
      }
      if (j - brh >= 60) {
        if (j - spaceh >= 60) {
          let h = [s.slice(0, j), '<br>', s.slice(j)].join("");
          console.log(h);
          s = h;
          brh = j+4;
          textl += 4;
        } else {
          let h = [s.slice(0, spaceh), '<br>', s.slice(spaceh)].join("");
          console.log("hellp");
          s = h;
          brh = spaceh +4;
          textl +=4;
        }
      }
    }
    let a = {};
    a.text = s;
    $(document).ready(function(){
      $.ajax({
        url: 'http://localhost:3000/articles/addComment/'+$('#articleId').val(),
        type:"POST",
        data: a,

        success: function(data){
          window.location.reload();
        },
        error: function(err){
          console.log(err);
        }
      })
    })
    $('#text').val("");
  }
  function deleteThis(obj){
    $(document).ready(function(){
        let id = $(obj).attr('class');
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/articles/deleteComment/" + id,
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
    })
}

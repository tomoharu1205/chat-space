$(function(){
  function buildHTML(message){
    var insertImage = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p> 
                        ${insertImage} 
                  </div>
                </div>`              
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }) 
    
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop:15000});
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })

    .always(function () {
      $(".form__submit").removeAttr("disabled");
      $(".new_message")[0].reset();
    });

  })
});
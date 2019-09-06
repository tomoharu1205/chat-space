$(document).on('turbolinks:load',　function(){
  function buildHTML(message) {
    var insertImage = message.image.url? `<img class="lower-message__image" src="${message.image.url}">` : "";
    var html = `<div class="message" data-id="${message.id}">
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
    var url = $(this).attr('action');
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
      $('.messages').append(html);
      $('.messages').animate({scrollTop:15000});
    })
    .fail(function(data) {
      alert('メッセージの送信に失敗しました');
    })

    .always(function () {
      $(".form__submit").removeAttr("disabled");
      $(".new_message")[0].reset();
    });

  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message:last").data("id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
        if (message.id > last_message_id ) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        }
      });
      //メッセージを追加
      
      $('.messages').animate({scrollTop:15000});
    })
    .fail(function() {
      alert("メッセージの自動更新ができませんでした");
    });
    
  };
  setInterval(reloadMessages, 5000);
});

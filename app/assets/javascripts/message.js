$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
        var image_element = message.image.url ? `<img class="lower-message__image" src="${message.image.url}"/>` : "";
        var html = `<div class="right__messages__message" data-message-id="${message.id}">
                        <div class="right__messages__message__upper-box">
                            <div class="right__messages__message__upper-box__name">
                                ${message.user_name}
                            </div>
                            <div class="right__messages__message__upper-box__date">
                                ${message.created_at}
                            </div>
                        </div>
                        <div class="right__messages__message__text">
                            <p class="lower-message__content">
                                ${message.content}
                            </p>
                                ${image_element}
                        </div>
                    </div>`
        return html;
    }
    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data){
            var html = buildHTML(data);
            $('.right__messages').append(html);
            $('.right__messages').animate({scrollTop: $('.right__messages')[0].scrollHeight}, 'fast');   
            $('form')[0].reset();
        })
        .fail(function(data){
            alert('エラーによりメッセージが送信できませんでした');
        })
        .always(function(data){
            $('.right__box__form__send').prop('disabled', false);
        })
    })

    var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.right__messages__message').last().data('message-id');
        $.ajax({
            url: "api/messages",
            type: 'GET',
            dataType: 'json',
            data: {id: last_message_id}
        })
        .done(function(messages) {
            var insertHTML = '';
            messages.forEach(function(message) {
                insertHTML = buildHTML(message);
                $('.right__messages').append(insertHTML);
                $('.right__messages').animate({scrollTop: $('.right__messages')[0].scrollHeight}, 'fast');
            })
        })
        .fail(function(messages) {
            console.log('error');
        });
        };
    };
    setInterval(reloadMessages, 5000);
});

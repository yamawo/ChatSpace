$(document).on('turbolinks:load', function(){
    function buildHTML(message) {
        var content = message.content ? `${ message.content }` : "";
        var img = message.image ? `<img src= ${ message.image }>` : "";
        var html = `<div class="right__messages__message">
                        <div class="right__messages__message__upper-box">
                            <div class="right__messages__message__upper-box__name">
                                ${message.user_name}
                            </div>
                            <div class="right__messages__message__upper-box__date">
                                ${message.date}
                            </div>
                        </div>
                        <div class="right__messages__message__text">
                            <p class="lower-message__content">
                                ${content}
                                ${img}
                            </p>
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
});

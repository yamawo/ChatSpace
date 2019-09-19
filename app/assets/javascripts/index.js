$(document).on('turbolinks:load', function() {

    var search_list = $("#user-search-result");
    var member_list = $("#chat-group-users");

    function appendUser(user) {
        var html = `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`
        search_list.append(html);
    }

    function appendNoUser(user) {
        var html = `<div class="chat-group-user clearfix">${ user }</div>`
        search_list.append(html);

    }

    function appendMember(userName, userId) {
        var html = `<div class='chat-group-user'>
                        <input name='group[user_ids][]' type='hidden' value=${userId}>
                        <p class='chat-group-user__name'>${userName}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
        member_list.append(html);
    }

    $("#user-search-field").on("keyup", function() {
        var input = $("#user-search-field").val();

        $.ajax({
            type: "GET",
            url: "/users",
            data: { keyword: input },
            dataType: "json"
        })
        .done(function(users) {
            $("#user-search-result").empty();
            if (users.length !== 0) {
                users.forEach(function(user){
                    appendUser(user);
                });
            }
            else {
                appendNoUser("一致するユーザーは存在しません");
            }
        })
        .fail(function() {
            alert("検索に失敗しました");
        })
    });
    $(document).on("click", ".user-search-add", function() {
        var userName = $(this).attr("data-user-name");
        var userId = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendMember(userName, userId);
    });
    $(document).on("click", ".user-search-remove", function() {
        $(this).parent().remove();
    });
});

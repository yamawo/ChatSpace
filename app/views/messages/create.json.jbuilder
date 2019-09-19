json.(@message, :content, :image)
json.id     @message.id
json.created_at   @message.created_at
json.user_name  @message.user.name
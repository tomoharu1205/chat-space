json.id @message.id
json.content @message.content
json.name @message.user.name
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
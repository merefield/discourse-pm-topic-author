# name: discourse-pm-topic-author
# about: Discourse PM Topic Author
# version: 0.1
# authors: Robert Barrow
# url: https://github.com/paviliondev/discourse-pm-topic-author


after_initialize do
  add_to_serializer(:topic_view, :topic_author) do
    User.find_by(id: object.topic.user_id).username
  end
end
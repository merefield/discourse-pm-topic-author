import { getOwner } from "discourse-common/lib/get-owner";
import User from "discourse/models/user";

export default {
  actions: {
    composePM(topic) {
      const userCardController = getOwner(this).lookup(`controller:user-card`);
      const postStream = topic.postStream;
      const firstPost = postStream.get("posts.firstObject");
      User.findByUsername(topic.topic_author).then(user => {
        userCardController.send("composePrivateMessage", user, firstPost);
      });
    }
  }
};

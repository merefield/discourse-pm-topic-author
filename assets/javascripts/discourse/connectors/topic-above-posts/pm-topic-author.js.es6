import { getOwner } from "discourse-common/lib/get-owner";
import User from "discourse/models/user";

export default {
  setupComponent(args, component) {
    component.set(
      "showPMTopicAuthorButton",
      component.siteSettings.pm_topic_author_button_enabled &&
        component.siteSettings.pm_topic_author_button_enabled_categories
          .split("|")
          .includes(`${args.model.category_id}`) &&
        args.model.topic_author != this.currentUser.username
    );
  },

  actions: {
    composePM(topic) {
      const userCardController = getOwner(this).lookup(`controller:user-card`);
      const postStream = topic.postStream;
      const firstPost = postStream.get("posts.firstObject");
      User.findByUsername(topic.topic_author).then((user) => {
        userCardController.send("composePrivateMessage", user, firstPost);
      });
    },
  },
};

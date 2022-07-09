import { User } from "./user.js";

class Bloger extends User {
    constructor(username, displayName, channelName) {
        super(username, displayName);
        this.channelName = channelName;
        this.subscribers = [];
    }

    upload(link) {
        this.subscribers.forEach(subscriber => {
            subscriber.notify(link, this);
        });
    }
}

export { Bloger }
import { User } from './user.js';
import { Bloger } from './bloger.js';

class State {
    constructor(status) {
        this.state = status;
    }

    createUser(username, displayName) {
        if (this.state) {
            return new User(username, displayName);
        }
        else {
            console.log('App is Down');
        }
    }

    createBloger(username, displayName, channelName) {
        if (this.state) {
            return new Bloger(username, displayName, channelName);
        }
        else {
            console.log('App is Down');
        }
    }
}

export { State }
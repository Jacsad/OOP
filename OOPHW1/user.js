class User {
    constructor(username, displayName) {
        this.username = username; // שם משתמש
        this.displayName = displayName; // שם תצוגה
        this.subscriptions = []; // ערוצים שאליהם היוזר מנוי
    }

    joinChannel(bloger) {
        if (bloger !== this) { // למנוע מצב שיוזר מסוג בלוגר נרשם לערוץ של עצמו
            if (this.subscriptions.includes(bloger)) {
                alert('User is already subscribed to this channel');
            }
            else {
                this.subscriptions.push(bloger);
                return true;
            }
        }

        return false;
    }

    removeChannel(bloger) {
        if (this.subscriptions.includes(bloger)) {
            const index = this.subscriptions.indexOf(bloger);
            if (index !== -1) {
                this.subscriptions.splice(index, 1);
            }
        }
    }

    notify(link, bloger) {
        if (bloger !== this) { // למנוע מצב שיוזר מסוג בלוגר שולח עדכון לערוץ של עצמו
            console.log(`Hey ${this.displayName}, ${bloger.displayName} just uploaded a new video to his channel: ${link}`);
        }
    }
}

export { User }
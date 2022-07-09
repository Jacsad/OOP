// Main script 
import { State } from './state.js';
import { Bloger } from './bloger.js';
import { User } from './user.js';

let appState = new State(true);

let blogers = [
    new Bloger('Watersky', 'Stas Savenko', 'Watersky Channel'),
    new Bloger('Jacsad', 'Yasha Sadikov ', 'Jacsad Channel'),
    new Bloger('MMA', 'MMA FIGHTS', 'MMA FIGHTS')
];

let users = [
    new User('avic', 'Avi Cohen'),
    new User('yashak', 'Yasha Karakov'),
    new User('ramik', 'Rami Karniel'),
    new User('ronis', 'Roni Stern'),
    new User('orelda', 'Orel Dagani')
];

let selectedBloger;

updateStateInDOM();

let stateBtn = document.getElementById('state-btn');
if (stateBtn) {
    stateBtn.addEventListener('click', function () {
        changeAppState();
    });
}

let blogerListElem = document.getElementById('bloger-list');
if (blogerListElem) {
    for (let i = 0; i < blogers.length; i++) {
        blogerListElem.innerHTML += `
            <li id='bloger-list-item-${blogers[i].username}'>${blogers[i].displayName}</li>
        `;
    }
}

let userListElem = document.getElementById('user-list');
if (userListElem) {
    for (let i = 0; i < users.length; i++) {
        userListElem.innerHTML += `
            <li id='user-list-item-${users[i].username}'>${users[i].displayName}</li>
        `;
    }
}

for (let i = 0; i < blogers.length; i++) {
    document.getElementById(`bloger-list-item-${blogers[i].username}`).addEventListener('click', function () {
        let bloger = blogers[i];
        selectedBloger = bloger;
        document.getElementById('selected-bloger').innerHTML = bloger.displayName;
        updateSubscribersTable();
    });
}

for (let i = 0; i < users.length; i++) {
    document.getElementById(`user-list-item-${users[i].username}`).addEventListener('click', function () {
        let user = users[i];
        document.getElementById('selected-user').innerHTML = user.displayName;
        if (selectedBloger) {
            const pickachu = confirm(`Do you sure you want to register ${user.displayName} to ${selectedBloger.displayName} channel`);
            if (pickachu) {
                if (user.joinChannel(selectedBloger)) {
                    selectedBloger.subscribers.push(user);
                    updateSubscribersTable();
                }
            }
        }
    });
}

document.getElementById('video-upload').addEventListener('click', function () {
    const link = document.getElementById('video-url-input').value;
    if (!selectedBloger) {
        alert('No bloger was selected');
    }
    else if (link && selectedBloger && selectedBloger.subscribers.length > 0) {
        selectedBloger.upload(link);
    }
    else if (selectedBloger && selectedBloger.subscribers.length === 0) {
        alert('There are no subsribers to ' + selectedBloger.displayName);
    }
});

function changeAppState() {
    appState.state = !appState.state;
    if (appState.state) {
        document.getElementById('main').classList.remove('down');
    }
    else {
        document.getElementById('main').classList.add('down');
    }
    updateStateInDOM();
}

function updateStateInDOM() {
    document.getElementById('app-state').innerHTML = appState.state ? 'Up' : 'Down';
}

function updateSubscribersTable() {
    const subscribersElem = document.getElementById('subscribers-list');
    subscribersElem.innerHTML = '';

    for (let j = 0; j < selectedBloger.subscribers.length; j++) {
        const user = selectedBloger.subscribers[j];
        subscribersElem.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td>${user.displayName}</td>
            </tr>
        `;
    }
}
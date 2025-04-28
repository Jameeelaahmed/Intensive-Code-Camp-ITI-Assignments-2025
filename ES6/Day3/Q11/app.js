import { fetchUsers } from './api.js';

fetchUsers().then(users => {
    if (users) {
        users.forEach(user => {
            console.log(user.name);
        });
    } else {
        throw new Error('error')
    }
});

import axios from 'axios';

// import { CHAT_CONFIG } from '../../../models/chat-config';

export const createUser = (user) => {
    console.log(user);
    axios.post('https://api.chatengine.io/users/', user
    ,
        {
            headers: {
                'PRIVATE-KEY': "c9d26357-f424-4b02-aa96-24c15c86dead"
            }
        }
    )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

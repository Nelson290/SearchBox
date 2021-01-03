import axios from 'axios';

const instance =axios.create({
    BaseUrl : 'https://react-my-burger-96c85.firebaseio.com/'
});

export default instance;
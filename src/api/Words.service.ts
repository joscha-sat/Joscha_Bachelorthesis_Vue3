import axios from './axios';

// API calls from BaseURL + custom end

export default {
    geRhymes(word: string) {
        return axios().get('talk?function=getRhymes&word=' + word);
    },
};

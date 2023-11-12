const BASE_URL = 'https://655093507d203ab6626df0fb.mockapi.io/products';

export function get(){
    return axios.get(BASE_URL).then((response)=>response.data);
}


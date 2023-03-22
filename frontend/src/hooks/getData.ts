import axios from 'axios';

export const getData = async (query:String) => {
    const options = {
      method: 'POST',
      url: 'http://localhost:5000/graphql/',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        query: query
      }
    };
    const { data } = await axios.request(options)
  
    return data
  };
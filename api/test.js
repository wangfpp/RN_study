import axios from 'axios';
const baseUrl = 'http://172.16.1.106:8088';
const testServe = {
    testGet: _ => {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/testget`).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    updateApp: _ => {
        return new Promise((resolve, reject) => {
            axios.get(`http://172.16.1.61:2081/html/app/raisehand/version.json`).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
};

export { testServe };
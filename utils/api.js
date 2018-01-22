var axios = require('axios');

var helpers = {
    getTODOList:function () {
        return axios.get("http://125.212.216.184:3000/api/Todos")
            .then(function (response) {
                return{
                    todos:response.data
                }
            })
    }
}

module.exports = helpers;
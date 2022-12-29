const profile = require('../model/userprofile')


module.exports = {
    saveImage: (data) => {
        return new Promise(async(resolve, reject) => {
            let result = await profile.create(data)
            console.log(result);
            resolve(result)
        })
    }
}
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';


/**
 * 这个模块是承上启下的，它里面暴露给控制器调用的方法，应该是同用
 */
// 参数1：集合名，参数2：数据，参数3：回调(数据库操作成功或失败返回)
exports.insertOne = (collecttionsName, param, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //    获取db对象
        const db = client.db(dbName);
        // 链接到相对应的集合
        const collection = db.collection(collecttionsName);

        collection.insertOne(param, (err, result) => {
            client.close()
            callback(err, result)
        })
    })
}
// 参数1：集合名，参数2：数据，参数3：回调(数据库操作成功或失败返回)
exports.findOne = (collecttionsName, param, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //    获取db对象
        const db = client.db(dbName);
        // 链接到相对应的集合
        const collection = db.collection(collecttionsName);

        collection.findOne(param, (err, result) => {
            client.close()
            callback(err, result)
        })
    })
}

//  查询多条文档
exports.findList = (collecttionsName, params, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collecttionsName);
        collection.find(params).toArray((err, docs) => {
            client.close()
            callback(err, docs)
        })
    })

}
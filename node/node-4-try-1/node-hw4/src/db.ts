// const MongoClient = require('mongodb').MongoClient;
import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let dbClient: MongoClient | null = null;
// export function getDbClient(): MongoClient | null {
//     return dbClient;
// }

export function getDbClientPromise(): Promise<MongoClient> {
    return new Promise(function (resolve, reject) {
        if (dbClient !== null) {
            resolve(dbClient);
        } else {
            getDbConnectPromise()
                .then(function resolved(client) {
                    dbClient = client;
                    resolve(dbClient);
                })
                .catch(function rejected(err) {
                    reject(err);
                });
        }
    });
}

function getDbConnectPromise(): Promise<MongoClient> {
    return new Promise(function (resolve, reject) {
        mongoClient.connect(function (err, client: MongoClient) {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
    });
}

// export function openDB(): void {
//     // console.log('mongoClient.connect()');
//     mongoClient.connect(function (err, client: MongoClient) {
//         dbClient = client;
//         // function writeResultToFile(ar) {
//         //     var obj = {};
//         //     for (var i=0; i<ar.length; i++) {
//         //         var article = ar[i];
//         //         obj[article.messageID] = article.text;
//         //     }

//         //     fs.writeFileSync('publicTrades.json', JSON.stringify(obj));

//         // }

//         if (err) {
//             return console.log(err);
//         } else {
//             // console.log('mongoClient.connect(): successfully opened db');
//         }
//         // взаимодействие с базой данных
//         // util.putArticlesIntoMongo(client, markedArticlesObj);
//         // const db = client.db("tb");
//         // db.collection("articles").find({markID:"1.1.2.1"}, {projection: { _id: 0, messageID: 1, text: 1 }})
//         //     .toArray(function(err, result){
//         //     if(err){
//         //         throw(err);
//         //     }
//         //     writeResultToFile(result);
//         //     client.close();
//         // })
//     });
// }

// module.exports = { getDbClient, openDB };

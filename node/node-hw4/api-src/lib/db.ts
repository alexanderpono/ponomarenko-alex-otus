import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let dbClient: MongoClient | null = null;

export function getDbClientPromise(): Promise<MongoClient> {
    return new Promise(function (resolve, reject) {
        const handler = setTimeout(function () {
            reject('getDbClient-TIMEOUT');
        }, 1000);

        if (dbClient !== null) {
            clearTimeout(handler);
            resolve(dbClient);
        } else {
            getDbConnectPromise()
                .then(function resolved(client) {
                    dbClient = client;
                    clearTimeout(handler);
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

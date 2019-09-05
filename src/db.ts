import mongodb from "mongodb";

// configuration details
const url = "mongodb://localhost:27017";
const dbName = "cardsim";

// internal reference to MongoDB instance
let _DB:any;

/**
 * Initializes the MongoDB instance connection.
 * @param callback the function to call once complete
 */
export function initDB( callback:any ) {
    if( _DB ) {
        console.log("Already connected to a MongoDB instance");
        return callback(null, _DB);
    }

    const mongoClient = mongodb.MongoClient;
    const mongoDrvConfig:object = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    // Use connect method to connect to the server
    mongoClient.connect(url, mongoDrvConfig, (error:any, client:mongodb.MongoClient) => {
        console.log(`Connected successfully to MongoDB: ${url}`);

        _DB = client.db(dbName);
        return callback( error );
    });
}

/**
 * Retrieves the cached DB instance
 */
export function getDB() {
  return _DB;
}

/**
 * Adds a document record to the DB
 * @param data the data to insert
 * @param callback function to call once completed, param will contain the row id
 */
export function addDoc( data:any, callback:any ) {
  getDB().collection("requests").insertOne(data, (error:any, r:any) => {
    if( error ) {
      console.log(`Unable to add document to requests: ${error}`);
    } else {
      callback( r.insertedId );
    }
  });
}

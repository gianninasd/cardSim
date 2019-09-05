import mongodb from "mongodb";

// configuration details
const url = "mongodb://localhost:27017";
const dbName = "cardsim";

/**
 * Allows connection to a MongoDB instance and ability to perform CRUD operations.
 */
export class DataStore {

  // internal reference to MongoDB instance
  private static _DB:any;

  /**
   * Initializes the MongoDB instance connection.
   * @param callback the function to call once complete
   */
  public static init( callback:any ) {
    if( DataStore._DB ) {
      console.log("Already connected to a MongoDB instance");
      return callback(null, DataStore._DB);
    }

    const mongoClient = mongodb.MongoClient;
    const mongoDrvConfig:object = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    // Use connect method to connect to the server
    mongoClient.connect(url, mongoDrvConfig, (error:any, client:mongodb.MongoClient) => {
      console.log(`Connected successfully to MongoDB: ${url}`);

      DataStore._DB = client.db(dbName);
      return callback( error );
    });
  }

  /**
   * Adds a document record to the DB
   * @param data the data to insert
   * @param callback function to call once completed, param will contain the row id
   */
  public static add( data:any, callback:any ) {
    DataStore._DB.collection("requests").insertOne(data, (error:any, r:any) => {
      if( error ) {
        console.log(`Unable to add document to requests: ${error}`);
      } else {
        callback( r.insertedId );
      }
    });
  }
}

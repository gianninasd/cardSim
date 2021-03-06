import mongodb from "mongodb";
import {dbName, dbUrl} from "./dbConfig";

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
    mongoClient.connect(dbUrl, mongoDrvConfig, (error:any, client:mongodb.MongoClient) => {
      console.log(`Connected successfully to MongoDB: ${dbUrl}`);

      DataStore._DB = client.db(dbName);
      return callback( error );
    });
  }

  /**
   * Adds a document record to the DB
   * @param data the data to insert
   * @param callback function to call once completed, param will contain the row id
   */
  public static add( data:any, callback?:any ) {
    DataStore._DB.collection("requests").insertOne(data, (error:any, res:any) => {
      if( error ) {
        console.log(`Unable to add document to requests: ${error}`);
      } else {
        if( callback ) {
          callback( res.insertedId );
        }
      }
    });
  }

  /**
   * Updates a document record in the DB
   * @param query the query to identify the row to update
   * @param data the data to be updated
   * @param callback optional, function to call once completed
   */
  public static update( query:any, data:any, callback?:any ) {
    DataStore._DB.collection("requests").updateOne(query, {$set: data}, (error:any, res:any) => {
      if( error ) {
        console.log(`Unable to update document to requests: ${error}`);
      } else {
        if( callback ) {
          callback( res );
        }
      }
    });
  }
}

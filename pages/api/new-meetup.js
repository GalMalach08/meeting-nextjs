// api/new-meetup
import { MongoClient } from "mongodb";
const handler = async (req, res, next) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://galmalach:1233212@cluster0.aa6nqor.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(req.body);
    client.close();
    res.status(201).send({ result });
  }
};

export default handler;

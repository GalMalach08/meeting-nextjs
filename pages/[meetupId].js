import MettupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const SingleMeetup = ({ meetup, meetups }) => {
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MettupDetail
        image={meetup.image}
        address={meetup.address}
        title={meetup.title}
        description={meetup.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://galmalach:1233212@cluster0.aa6nqor.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    fallback: "blocking", // the list might be change
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://galmalach:1233212@cluster0.aa6nqor.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetup: { ...meetup, _id: meetup._id.toString() },
    },
  };
};

export default SingleMeetup;

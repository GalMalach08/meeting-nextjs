import MettupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const SingleMeetup = ({ meetup }) => {
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
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "62ab06de301859697f891bd6",
        },
      },
      {
        params: {
          meetupId: "62ab05b6301859697f891bd5",
        },
      },
    ],
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

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="huge list of highly react meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// Run on the server after deployment
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   console.log(req);

//   // fetch data from api
//   return {
//     props: {
//       meetups: [],
//     },
//   };
// };

// Running on the build proccess
export const getStaticProps = async () => {
  // fecth data from api

  const client = await MongoClient.connect(
    "mongodb+srv://galmalach:1233212@cluster0.aa6nqor.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        ...meetup,
        _id: meetup._id.toString(),
      })),

      revalidate: 1,
    },
  };
};

export default HomePage;

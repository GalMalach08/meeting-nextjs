import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetup = async (values) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    router.push("/");
  };
  return (
    <div>
      <Head>
        <meta name="description" content="add your new meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </div>
  );
};

export default NewMeetupPage;

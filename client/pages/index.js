import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are sign in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

Landing.getInitialProps = async (context) => {
  console.log("Landing Page");
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default Landing;

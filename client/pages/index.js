import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  // console.log(currentUser);

  // axios.get("/api/users/currentuser").catch((err) => {
  //   console.log(err.data);
  // });
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

Landing.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default Landing;
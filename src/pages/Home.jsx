import useAuth from "../hooks/useAuth.js";
const Home = () => {
  const { auth } = useAuth();
  console.log("Auth context in Home:", auth);
  return <></>;
};

export default Home;

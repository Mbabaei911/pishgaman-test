import LoginForm from "@/components/inputForm";
import MapWithCards from "@/components/mapWithCards";
import { useSelector } from "react-redux";



const Home: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth);
console.log(authState);
  return (
    <div>
      {authState.isLoggedIn ? (
        <MapWithCards/>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;

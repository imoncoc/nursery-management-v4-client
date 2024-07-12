import MainLayout from "./components/layout/MainLayout";
import { selectCurrentCart } from "./redux/features/cartSlice";
import { useAppSelector } from "./redux/hooks";

function App() {
  const data = useAppSelector(selectCurrentCart);

  console.log("app.tx data cart: ", data);

  console.log("clicked");

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;

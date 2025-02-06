import Welcome from "./components/Welcome/Welcome";
import { getUserName } from "./utils/userName";
import "./index.css";
import { useEffect, useState } from "react";
import Boards from "./components/Boards/Boards";

function App() {
  const [nameSaved, setNameSaved] = useState(false);

  useEffect(() => {
    const userName = getUserName();
    if (userName) {
      setNameSaved(true);
      console.log("cambio de estado");
    }
  }, []);

  const handleSaveName = () => {
    setNameSaved(true);
  };

  return (
    <>{nameSaved ? <Boards /> : <Welcome onSaveName={handleSaveName} />}</>
  );
}

export default App;

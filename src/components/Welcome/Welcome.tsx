import "./Welcome.css";
import { saveUserName } from "../../utils/userName";
import { useState } from "react";

interface Props {
  onSaveName: () => void;
}

const Welcome: React.FC<Props> = ({ onSaveName }) => {
  const [userName, setUserName] = useState("");
  const [invalidUserName, setInvalidUserName] = useState(false);

  const handleSaveUserName = () => {
    if (/^[a-zA-ZáéíóúÁÉÍÓÚ ]{4,20}$/.test(userName)) {
      saveUserName(userName);
      onSaveName();
    } else {
      setInvalidUserName(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveUserName();
    }
  };

  return (
    <section className="welcome visible-flex">
      <div className="welcome__container">
        <h1 className="welcome__title">Welcome</h1>
        <h2 className="welcome__subtitle">To our list-making app</h2>
        <p className="welcome__desc">
          To continue and have a better experience please type your name
        </p>
        <div className="name-container">
          <div className="input">
            <input
              id="username"
              type="text"
              className={`input__name ${invalidUserName ? "error" : ""}`}
              autoComplete="off"
              required
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
              value={userName}
              /*  pattern="" */
            />
            <div
              className={`input__label-line ${invalidUserName ? "error" : ""}`}
            >
              Enter your name
            </div>
          </div>
          <div className="continue">
            <i
              className="fa-solid fa-circle-arrow-right continue__btn"
              onClick={handleSaveUserName}
            ></i>
          </div>
          <p
            className={`name__error ${invalidUserName ? "visible" : "hidden"}`}
          >
            Please enter a valid name with 4 to 20 letters, no numbers or
            special characters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

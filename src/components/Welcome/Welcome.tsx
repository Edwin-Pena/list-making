import "./Welcome.css";

const Welcome = () => {
  return (
    <section className="welcome">
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
              className="input__name"
              autoComplete="off"
              required
            />
            <div className="input__label-line">Enter your name</div>
          </div>
          <div className="continue">
            <i className="fa-solid fa-circle-arrow-right continue__btn"></i>
          </div>
          <p className="name__error hidden">
            Please enter a valid name that has more than 4 letters
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

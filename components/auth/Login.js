import { useState } from "react";
import { useGlobalContext } from "../context";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginIn, setIsLoginIn] = useState(true);

  const { login, signup, name, setName } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Proszę uzupełnić pola logowania!");
      return;
    }
    if (isLoginIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Niepoprawny email lub hasło!");
      }
      return;
    }
    await signup(email, password, name);
  };

  return (
    <Wrapper>
      <div className="container">
        <h2>{isLoginIn ? "Logowanie" : "Rejestracja"}</h2>
        {error && (
          <div>
            <h2>{error}</h2>
          </div>
        )}
        <form>
          {!isLoginIn && (
            <input
              type="text"
              placeholder="Nazwa"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}
          <input
            type="email"
            placeholder="Adres Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {isLoginIn && (
            <section className="login-remember">
              <input
                id="remember"
                type="checkbox"
                // checked={rememberLogin}
                // onChange={() => setRememberLogin(!rememberLogin)}
              />
              <label htmlFor="remember">ZAPAMIĘTAJ MNIE</label>
            </section>
          )}
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            {isLoginIn ? "zaloguj się" : "zarejestruj się"}
          </button>
        </form>
        <div className="loginAsk">
          {isLoginIn ? (
            <p>
              Nie masz jeszcze konta? <br />
              <span onClick={() => setIsLoginIn(false)}>
                Zarejestruj się!
              </span>{" "}
            </p>
          ) : (
            <p>
              Masz już konto? <br />
              <span onClick={() => setIsLoginIn(true)}>Zaloguj się!</span>
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    width: 50vw;
    min-height: 60vh;
    @media screen and (max-width: 800px) {
      width: 90vw;
      min-height: 70vh;
    }
  }
  h2 {
    text-transform: uppercase;
    color: rgb(54, 102, 9);
    font-size: 1.5rem;
  }
  form {
    margin: 5vh auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    input {
      width: 100%;
      margin: 1vh auto;
      padding: 5px 10px;
    }
    .login-remember {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2vh;
      input {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    button {
      margin: 6vh auto 0vh;
      padding: 10px 20px;
      background: rgb(54, 102, 9);
      color: #fff;
      border-radius: 10px;
      border: none;
      font-size: 1rem;
    }
  }
  .loginAsk {
    p {
      color: #222;
      text-align: center;
      span {
        color: rgb(54, 102, 9);
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
`;

export default Login;

import { useEffect, useState } from "react";
import "./App.css";
import Emails from "./pages/Emails";
import SingleEmail from "./pages/SingleEmail";
import { useSelector } from "react-redux";

function App() {
  const { open } = useSelector((state) => state?.email);
  const { singleEmail } = useSelector((state) => state?.email);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

   
  
  return (
    <main className="main-container">
      <section
        className="email-container"
        style={{ width: open === true ? " 60%" : "100%" }}
      >
        <Emails favorites={favorites} setFavorites={setFavorites} />
      </section>
      {open && (
        <section className="single-email-container">
          <SingleEmail
            detailsEmail={singleEmail}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </section>
      )}
    </main>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { GetAllEmails } from "../Apicalls/emailapi";
import List from "../Component/List";
import { useDispatch, useSelector } from "react-redux";
import { SetEmails, SetHomeEmails } from "../redux/EmailSlice";

const Emails = ({ favorites }) => {
  const { email } = useSelector((state) => state?.email);
  const { HomeEmails } = useSelector((state) => state?.email);
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();

  const [readsEmail, setReadsEmail] = useState(
    JSON.parse(localStorage.getItem("emailIds")) || []
  );

  const GetEmails = async () => {
    try {
      const response = await GetAllEmails();
      dispatch(SetHomeEmails(response.list));
      dispatch(SetEmails(response.list));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReadEmail = (id) => {
    if (!readsEmail.includes(id)) {
      setReadsEmail((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (filter === "unread") {
      const filterData = HomeEmails.filter(
        (item) => !readsEmail.includes(item.id)
      );
      dispatch(SetEmails(filterData));
    } else if (filter === "read") {
      const filter2Data = HomeEmails.filter((item) =>
        readsEmail.includes(item.id)
      );
      dispatch(SetEmails(filter2Data));
    } else {
      const filterData = HomeEmails.filter((item) =>
        favorites.includes(item.id)
      );
      dispatch(SetEmails(filterData));
    }
  }, [filter]);

  useEffect(() => {
    GetEmails();
  }, []);

  useEffect(() => {
    localStorage.setItem("emailIds", JSON.stringify(readsEmail));
  }, [readsEmail]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <article className="email-article">
      <section>
        <header className="filter">
          <p>Filter By :</p>
          <button onClick={() => setFilter("unread")}>Unread</button>
          <button onClick={() => setFilter("read")}>Read</button>
          <button onClick={() => setFilter("favorites")}>Favorites</button>
        </header>
      </section>

      <section>
        <List
          data={email}
          readsEmail={readsEmail}
          handleReadEmail={handleReadEmail}
          favorites={favorites}
        />
      </section>
    </article>
  );
};

export default Emails;

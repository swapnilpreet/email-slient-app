import React, { useEffect, useState } from "react";
import { convertToDate } from "../utils/date";
import { useSelector } from "react-redux";

 
const SingleEmail = ({ detailsEmail,favorites, setFavorites}) => {
  const [data, setdata] = useState()
  const { HomeEmails } = useSelector((state) => state?.email);

  useEffect(()=>{
    const filter2Data =HomeEmails?.filter(item => detailsEmail.id === item.id);
    setdata(filter2Data);
  }, [detailsEmail])


  const handlefavoriteemail = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  }

  useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

  return (
    <article className="inside-single">

    {data?.map((email,index)=>(
      <header className="single-email-contain">
        <section className="single-name-box">
            <div className="avatar">
              {email?.from?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>{email?.subject}</h1>
              <p>{convertToDate(email?.date)}</p>
            </div>
        </section>
        <section >
          <button onClick={()=>handlefavoriteemail(email.id)} className="fev-btn">Mark as favorite</button>
        </section>
      </header>
    ))}
  <section>
    <div dangerouslySetInnerHTML={{ __html: detailsEmail?.body }}>
    </div>
  </section>
    </article>
  );
};

export default SingleEmail;

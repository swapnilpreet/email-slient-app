import React from "react";
import { convertToDate } from "../utils/date";
import { GetSingleEmails } from "../Apicalls/emailapi";
import { setopen, SetSingleEmail } from "../redux/EmailSlice";
import { useDispatch } from "react-redux";

const List = ({ data, readsEmail, handleReadEmail, favorites }) => {
  const dispatch = useDispatch();

  const handleSingleemail = async (id) => {
    try {
      const response = await GetSingleEmails(id);
      dispatch(SetSingleEmail(response));
    } catch (error) {
      console.log(error);
    }
    dispatch(setopen(true));
  };

  return (
    <section className="list">
      {data &&
        data?.length > 0 &&
        data?.map((email, index) => (
          <div
            className="email-list"
            key={index}
            onClick={() => {
              handleSingleemail(email.id);
              handleReadEmail(email.id);
            }}
            style={{
              backgroundColor: readsEmail?.includes(email.id)
                ? "#F2F2F2"
                : "#F4F5F9",
            }}
          >
            <div className="avatar">
              {email?.from?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p>
                From: <b>{email?.from?.email}</b>
              </p>
              <p>
                Subject: <b>{email?.subject}</b>
              </p>
              <p>{email?.short_description}</p>
              <div className="date-email-list">
                <section>
                  <p>{convertToDate(email.date)}</p>
                </section>
                <section>
                  {favorites.includes(email.id) ? (
                    <b>
                      <p>Favorite</p>
                    </b>
                  ) : null}
                </section>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default List;


import React, { useEffect, useState } from "react";
import { getToday } from "../services/apodApi";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ApodCard from "../components/ApodCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getToday()
      .then((res) => setData(res.data))
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <>
      <Navbar />

      <main className="home-container">
        <h1 className="pageTitle">Today’s Astronomy Picture</h1>
        {err && <div className="alert">{err}</div>}

        {!data ? (
          <Loader />
        ) : (
          <div className="home-apod-wrapper">
            <ApodCard apod={data} />
          </div>
        )}
      </main>
    </>
  );
}

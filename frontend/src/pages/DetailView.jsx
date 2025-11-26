import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getByDate } from "../services/apodApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ApodCard from "../components/ApodCard";

export default function DetailView() {
  const { date } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getByDate(date)
      .then((res) => setData(res.data))  
      .catch(console.error);
  }, [date]);

  return (
    <>
      <Navbar />
      <main className="container">
        {!data ? <Loader /> : <ApodCard apod={data} />}
      </main>
    </>
  );
}

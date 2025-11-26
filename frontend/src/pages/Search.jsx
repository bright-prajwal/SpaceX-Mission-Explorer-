import React, { useState } from "react";
import { getByDate } from "../services/apodApi";
import Loader from "../components/Loader";
import ApodCard from "../components/ApodCard";

export default function Search() {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!date) return alert("Please select a date");

    setLoading(true);
    const result = await getByDate(date);
    setData(result);
    setLoading(false);
  }

  return (
    <div className="search-page">
      <h1>Search APOD by Date</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
      />

      <button onClick={handleSearch} className="search-btn">
        Search
      </button>

      {loading && <Loader />}

      {data && <ApodCard apod={data} />}
    </div>
  );
}

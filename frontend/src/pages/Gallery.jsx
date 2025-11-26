
import React, { useEffect, useState } from "react";
import { getRecent } from "../services/apodApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import GalleryGrid from "../components/GalleryGrid";

export default function Gallery() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getRecent()
      .then((res) => setItems(res.data)) 
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container">
        {!items ? <Loader /> : <GalleryGrid items={items} />}
      </main>
    </>
  );
}


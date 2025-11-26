// import React, { useEffect, useState } from "react";
// import { getRecent } from "../services/apodApi";
// import Navbar from "../components/Navbar";
// import Loader from "../components/Loader";
// import GalleryGrid from "../components/GalleryGrid";

// export default function Gallery() {
//   const [items, setItems] = useState(null);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await getRecent();
//         // NASA may return an array in random order; sort desc by date
//         const sorted = Array.isArray(res)
//           ? [...res].sort((a, b) => (a.date < b.date ? 1 : -1))
//           : [];
//         if (mounted) setItems(sorted);
//       } catch (e) {
//         setErr(e.message);
//       }
//     })();
//     return () => (mounted = false);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main className="container">
//         <div className="headRow">
//           <h1 className="pageTitle">Recent Gallery</h1>
//           <p className="muted">Click any card to view details</p>
//         </div>
//         {err && <div className="alert">{err}</div>}
//         {!items ? <Loader /> : <GalleryGrid items={items} />}
//       </main>
//     </>
//   );
// }

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


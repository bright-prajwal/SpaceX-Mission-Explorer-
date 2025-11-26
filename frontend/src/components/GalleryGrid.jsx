

import React from "react";
import { Link } from "react-router-dom";
import ApodCard from "./ApodCard";

export default function GalleryGrid({ items = [] }) {
  return (
    
    <div className="masonry">
      {items.map((item) => (
        <Link 
          to={`/detail/${item.date}`} 
          key={item.date}
          className="masonry-item"
        >
          <ApodCard apod={item} compact />
        </Link>
      ))}
    </div>
  );
}

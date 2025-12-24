import React, { useState } from "react";
import useInView from "../hooks/useInView";

export default function ApodCard({ apod, compact = false }) {
  if (!apod) return null;

  const { ref, inView } = useInView({ threshold: 0.15 });
  const [loaded, setLoaded] = useState(false);

  const getMedia = () => {
    if (!inView) {
      return <div className="card__mediaWrap aspect-16x9 reveal" />;
    }

    if (apod.media_type === "image") {
      return (
        <img
          className={`card__media ${loaded ? "media-loaded" : "media-loading"}`}
          src={apod.url}
          alt={apod.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      );
    }

    // Handle video (YouTube, Vimeo)
    let videoUrl = apod.url || "";

    if (videoUrl.includes("youtube.com/watch?v=")) {
      const id = videoUrl.split("v=")[1]?.split("&")[0];
      videoUrl = `https://www.youtube.com/embed/${id}`;
    }

    if (videoUrl.includes("youtu.be/")) {
      const id = videoUrl.split("youtu.be/")[1];
      videoUrl = `https://www.youtube.com/embed/${id}`;
    }

    if (videoUrl.includes("vimeo.com")) {
      const id = videoUrl.split("vimeo.com/")[1];
      videoUrl = `https://player.vimeo.com/video/${id}`;
    }

    return (
      <div className="card__media aspect-16x9">
        <iframe
          src={videoUrl}
          title={apod.title}
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <article
      ref={ref}
      className={`card ${compact ? "card--compact" : ""} reveal ${
        inView ? "reveal--in" : ""
      }`}
    >
      <div className="card__mediaWrap">{getMedia()}</div>
      <div className="card__body">
        <div className="card__head">
          <h2 className="card__title">{apod.title}</h2>
          <span className="card__date">{apod.date}</span>
        </div>
        {!compact && <p className="card__text">{apod.explanation}</p>}
        <div className="card__meta">
          {apod.hdurl && (
            <a className="btn btn--sm" href={apod.hdurl} target="_blank">
              View HD
            </a>
          )}
          <span className="muted">
            {apod.media_type === "image" ? "Image" : "Video"}
          </span>
        </div>
      </div>
    </article>
  );
}

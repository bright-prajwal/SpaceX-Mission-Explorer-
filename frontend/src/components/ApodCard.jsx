import React from "react";

export default function ApodCard({ apod, compact = false }) {
  if (!apod) return null;

  const getMedia = () => {
    if (!apod.url) {
      return (
        <div className="card__media fallback">
          <p>No media available for this APOD.</p>
        </div>
      );
    }
    if (apod.media_type === "image") {
      return (
        <img
          className="card__media"
          src={apod.url}
          alt={apod.title}
          loading="lazy"
          style={{ borderRadius: "0px", objectFit: "cover" }}
        />
      );
    }
    let videoUrl = apod.url;
    // if (typeof videoUrl === "string") {
    //   if (videoUrl.includes("youtube.com/watch?v=")) {
    //     const id = videoUrl.split("v=")[1]?.split("&")[0];
    //     videoUrl = `https://www.youtube.com/embed/${id}`;
    //   }
    //   if (videoUrl.includes("youtu.be/")) {
    //     const id = videoUrl.split("youtu.be/")[1];
    //     videoUrl = `https://www.youtube.com/embed/${id}`;
    //   }
    //   if (videoUrl.includes("vimeo.com/")) {
    //     const id = videoUrl.split("vimeo.com/")[1];
    //     videoUrl = `https://player.vimeo.com/video/${id}`;
    //   }

    return (
      <div className="card__media">
        <iframe
          src={videoUrl}
          title={apod.title}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          // style={{
          //   width: "100%",
          //   minHeight: "350px",
          //   border: "none",
          //   display: "block",
          // }}
          style={{ borderRadius: '0px', objectFit: 'cover' }}

        />
      </div>
    );
  };

  return (
    <article className={`card ${compact ? "card--compact" : ""}`}>
      <div className="card__mediaWrap">{getMedia()}</div>

      <div className="card__body">
        <div className="card__head">
          <h2 className="card__title">{apod.title}</h2>
          <span className="card__date">{apod.date}</span>
        </div>

        {!compact && <p className="card__text">{apod.explanation}</p>}

        <div className="card__meta">
          {apod.hdurl && (
            <a
              className="btn btn--sm"
              href={apod.hdurl}
              target="_blank"
              rel="noreferrer"
            >
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

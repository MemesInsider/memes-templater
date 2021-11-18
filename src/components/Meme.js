import React from "react";

export const Meme = ({ template, styling_class, click_handler, no_text = false }) => {
  return (
    <article id={template.id} style={{ cursor: "pointer" }} className={styling_class}>
      <span className="image" style={{ cursor: "pointer" }} onClick={click_handler}>
        <img src={template.url} alt={template.name} />
      </span>
      <a onClick={click_handler}>
        <h2>{no_text ? "": template.name}</h2>
        <div className="content" style={{ cursor: "pointer" }} onClick={click_handler}>
          <p>{no_text ? "": "Click to use this template !"}</p>
        </div>
      </a>
    </article>
  );
};

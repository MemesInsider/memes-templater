import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme";

const objectToQueryParam = obj => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
};

function App() {
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [meme, setMeme] = useState(null);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(x =>
            x.json().then(response => setTemplates(response.data.memes))
        );
    }, []);

    if (meme) {
        return (
            <div style={{ textAlign: "center" }}>
                <img style={{ width: 200 }} src={meme} alt="custom meme" />
            </div>
        );
    }

    const total_styles = 6;
    const sources = [
        { src: "images/pic01.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic02.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic03.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic04.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic05.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic06.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic07.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic08.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic09.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic10.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic11.jpg", title: "Magna", text: "Something something" },
        { src: "images/pic12.jpg", title: "Magna", text: "Something something" },
    ];

    return (
        <section className="tiles">
            {
                templates.map((obj, _idx) => {
                    const style_idx = Math.ceil(Math.random() * (total_styles));

                    return (
                        <article id={obj.id} className={""/*`style${style_idx}`*/}>
                            <span className="image">
                                <img src={obj.url} alt={obj.name} />
                            </span>
                            <a href="generic.html">
                                <h2>{obj.name}</h2>
                                <div className="content">
                                    <p>"Click to use this template !"</p>
                                </div>
                            </a>
                        </article>
                    )
                })
            }
        </section>
    );
}

function App2() {
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [meme, setMeme] = useState(null);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(x =>
            x.json().then(response => setTemplates(response.data.memes))
        );
    }, []);

    if (meme) {
        return (
            <div style={{ textAlign: "center" }}>
                <img style={{ width: 200 }} src={meme} alt="custom meme" />
            </div>
        );
    }
    return (
        <div style={{ textAlign: "center" }}>
            {template && (
                <form
                    onSubmit={async e => {
                        e.preventDefault();
                        // add logic to create meme from api
                        const params = {
                            template_id: template.id,
                            text0: topText,
                            text1: bottomText,
                            username: "xzk03017",
                            password: "xzk03017@cndps.com"
                        };
                        const response = await fetch(
                            `https://api.imgflip.com/caption_image${objectToQueryParam(
                                params
                            )}`
                        );
                        const json = await response.json();
                        setMeme(json.data.url);
                    }}
                >
                    <Meme template={template} />
                    <input
                        placeholder="top text"
                        value={topText}
                        onChange={e => setTopText(e.target.value)}
                    />
                    <input
                        placeholder="bottom text"
                        value={bottomText}
                        onChange={e => setBottomText(e.target.value)}
                    />
                    <button type="submit">create meme</button>
                </form>
            )}
            {!template && (
                <>
                    <h1>Pick a template</h1>
                    {templates.map(template => {
                        return (
                            <Meme
                                template={template}
                                onClick={() => {
                                    setTemplate(template);
                                }}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default App;

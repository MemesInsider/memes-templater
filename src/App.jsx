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

    const limit_memes = 50; /**How many memes to show? (Max 100) */
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(x =>
            x.json().then(response => setTemplates(response.data.memes.slice(0, limit_memes)))
        );
    }, []);

    const total_styles = 6;

    return (
        <section className="tiles">
            {
                meme && (
                    <Meme template={{ url: meme }} no_text={true} no_anchor={true} />
                )
            }
            {!meme && template && (
                <form
                    onSubmit={async e => {
                        e.preventDefault();
                        const params = {
                            template_id: template.id,
                            text0: topText,
                            text1: bottomText,
                            username: process.env.REACT_APP_IMGFLIP_USERNAME,
                            password: process.env.REACT_APP_IMGFLIP_PASSWORD
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
                    <Meme template={template} styling_class="" onClick={() => {
                        setTemplate(template);
                    }} no_text={true} />
                    <input
                        placeholder="Text at Top"
                        value={topText}
                        onChange={e => setTopText(e.target.value)}
                    />
                    <input
                        placeholder="Text at Bottom"
                        value={bottomText}
                        onChange={e => setBottomText(e.target.value)}
                    />
                    <button type="submit">Create Meme !</button>
                </form>
            )}
            {
                !meme && !template && templates.map((obj, _idx) => {
                    const style_idx = Math.ceil(Math.random() * (total_styles));

                    console.log("Here");
                    return (
                        <Meme key={_idx} template={obj} styling_class={""/*`style${style_idx}`*/} click_handler={() => {
                            console.log("Clicked: ", obj);
                            setTemplate(obj);
                        }} />
                    )
                })
            }
        </section>
    );
}

export default App;

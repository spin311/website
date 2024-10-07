import {useLanguage} from "../../context/LanguageContext";
import "./Main.css";
import React from 'react';
import Experience from "./experience/Experience";

function Main () {
    const {text, formatTextWithLineBreaks} = useLanguage();
    const experiences  = [
        {
            title: text.EXPERIENCE.xp3_title,
            company: text.EXPERIENCE.xp3_company,
            desc: text.EXPERIENCE.xp3_desc,
            website: "https://digitalschool.si/",
            years: `2021 - 2024`
        },
        {
            title: text.EXPERIENCE.xp1_title,
            company: text.EXPERIENCE.xp1_company,
            desc: text.EXPERIENCE.xp1_desc,
            website: "https://www.ixtlan-team.si/",
            years: "2023 - 2024"
        },
        {
            title: text.EXPERIENCE.xp2_title,
            company: text.EXPERIENCE.xp2_company,
            desc: text.EXPERIENCE.xp2_desc,
            website:  "https://formaviva.com/",
            years: `2024 - ${text.EXPERIENCE.current}`
        }

    ];

    return (
        <div className="Main">
            <h1>{text.MAIN.title}</h1>
            <p>
                {formatTextWithLineBreaks(text.MAIN.description)}
            </p>
            <h2>{text.EXPERIENCE.title}</h2>
            {experiences.map((xp, index) => (
                <Experience key={index} title={xp.title} company={xp.company} desc={xp.desc} years={xp.years} website={xp.website} />
            ))}
        </div>
    );
}

export default Main;
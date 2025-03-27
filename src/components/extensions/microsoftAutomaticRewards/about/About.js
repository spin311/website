import ImageTooltip from "../../../image-tooltip/ImageTooltip";
import {useLanguage} from "../../../../context/LanguageContext";
function About() {
    const {text, formatHtml} = useLanguage();
    return (
        <div id="about">
            <h2>{text.MICROSOFT.about}</h2>
            <p>
                {text.MICROSOFT.description}
            </p>
            <div className="to-work">
                <h3>{text.MICROSOFT.to_work}</h3>
                <ul>
                    <li className='underline-link' >{formatHtml(`${text.MICROSOFT.step1}`)}</li>
                    <li>{text.MICROSOFT.step2}</li>
                </ul>
                <h3>{text.MICROSOFT.to_daily} </h3>
                <ul>
                    <li>{text.MICROSOFT.step3} <ImageTooltip src='enable-daily.png'/></li>
                    <li className='underline-link' >{formatHtml(`${text.MICROSOFT.step4}`)}  <ImageTooltip src='enable-popup.png'/></li>
                </ul>
                <h3>{text.MICROSOFT.to_mobile}</h3>
                <ul>
                    <li className='underline-link' >{formatHtml(`${text.MICROSOFT.step5}`)}</li>
                </ul>
            </div>
        </div>
    )
}

export default About;
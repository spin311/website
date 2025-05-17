import {useLanguage} from "../../../../context/LanguageContext";
import ImageTooltip from "../../../image-tooltip/ImageTooltip";
import {Link} from "react-router-dom";

function About() {
    const {text, formatHtml} = useLanguage();
    return (
        <div id="about">
            <h2>{text.EXTENSION.about}</h2>
            <p>
                {text.PROLIFIC.description}
            </p>
            <div className="to-work">
                <div className="about-text">
                    <h3>{text.PROLIFIC.to_work}</h3>
                    <ul className='to-work-list'>
                        <li className='underline-link' >{formatHtml(`${text.PROLIFIC.step1}`)}</li>
                        <li>{text.PROLIFIC.step2} <ImageTooltip src='enableGoogle2.png'/></li>
                        <li>{text.PROLIFIC.step3} <ImageTooltip src='enableWindows2.png'/></li>
                    </ul>
                </div>
                <div className="about-image">
                    <img className="" src={`${process.env.PUBLIC_URL}/assets/images/studiesTab.png`} alt="Studies tab"/>
                </div>
            </div>
        </div>
    )

}
export default About;
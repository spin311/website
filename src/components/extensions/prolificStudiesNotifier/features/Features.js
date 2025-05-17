import {useLanguage} from "../../../../context/LanguageContext";
import {Link} from "react-router-dom";

function Features ({className = ''}) {
    const {text} = useLanguage();
    return (
        <div id="features" className={className}>
            <h2 className="f-title">{text.GENERAL.features}</h2>
            <ul className="f-list">
                <li>{text.PROLIFIC.feature1}</li>
                <li>{text.PROLIFIC.feature2}</li>
                <li>{text.PROLIFIC.feature3}</li>
                <li>{text.PROLIFIC.feature4}</li>
                <li>{text.PROLIFIC.feature5}</li>
                <li className='underline-link' ><Link to={`/contact?subject=${encodeURIComponent("Prolific Notifier feature suggestion")}`}>{text.EXTENSION.new_feature}</Link></li>
            </ul>
            <img src={`${process.env.PUBLIC_URL}/assets/images/prolificNotifier.png`} alt="microsoft popup" className="f-image"/>
        </div>
    )
}

export default Features;
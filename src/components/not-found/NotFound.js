import "./NotFound.css"
import BackArrow from "../back-arrow/BackArrow";
import {useLanguage} from "../../context/LanguageContext";
import {Helmet} from "react-helmet";

function NotFound() {
    let {text} = useLanguage();
    return (
        <>
            <Helmet>
                <title>404 {text.GENERAL.not_found}</title>
                <meta name="description" content="Not found page" />
            </Helmet>
            <BackArrow/>
            <div className={"notFound"}>
                <h1>404 {text.GENERAL.not_found}</h1>
                <img className={"dogImg"} src={`${process.env.PUBLIC_URL}/assets/images/sniffer.jpg`} alt="dog"/>
            </div>
        </>
    );
}

export default NotFound;
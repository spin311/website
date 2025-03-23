import "./NotFound.css"
import {Link} from "react-router-dom";
import HomeArrow from "../home-arrow/HomeArrow";
import {useLanguage} from "../../context/LanguageContext";

function NotFound() {
    let {text} = useLanguage();
    return (
        <>
            <HomeArrow/>
            <div className={"notFound"}>
                <h1>404 {text.GENERAL.not_found}</h1>
                <img className={"dogImg"} src={`${process.env.PUBLIC_URL}/assets/images/sniffer.jpg`} alt="dog"/>
            </div>
        </>
    );
}

export default NotFound;
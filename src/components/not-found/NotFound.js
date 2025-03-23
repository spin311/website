import "./NotFound.css"
import {Link} from "react-router-dom";
import HomeArrow from "../home-arrow/HomeArrow";

function NotFound() {
    return (
        <>
            <HomeArrow/>
            <div className={"notFound"}>
                <h1>404 Page not found</h1>
                <img className={"dogImg"} src={`${process.env.PUBLIC_URL}/assets/images/sniffer.jpg`} alt="dog"/>
            </div>
        </>
    );
}

export default NotFound;
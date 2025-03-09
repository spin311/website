import "./NotFound.css"
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
            <div>
                <Link to="/">
                    <img className={"left-arrow"} src={`${process.env.PUBLIC_URL}/assets/svgs/left-arrow.svg`} alt="left-arrow"/>
                </Link>
            </div>
            <div className={"notFound"}>
                <h1>404 Page not found</h1>
                <img className={"dogImg"} src={`${process.env.PUBLIC_URL}/assets/images/sniffer.jpg`} alt="dog"/>
            </div>
        </>
    );
}

export default NotFound;
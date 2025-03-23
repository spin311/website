import {Link} from "react-router-dom";
import "./HomeArrow.css";

function HomeArrow() {
    return (
        <div>
            <Link to="/">
                <img className={"left-arrow"} src={`${process.env.PUBLIC_URL}/assets/svgs/left-arrow.svg`}
                     alt="left-arrow"/>
            </Link>
        </div>);
}
export default HomeArrow;
import {useNavigate} from "react-router-dom";
import "./BackArrow.css";

function BackArrow() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="left-arrow-button" onClick={() => navigate(-1)}>
                <img
                    className="left-arrow"
                    src={`${process.env.PUBLIC_URL}/assets/svgs/left-arrow.svg`}
                    alt="left arrow"
                />
            </div>
        </div>);
}
export default BackArrow;
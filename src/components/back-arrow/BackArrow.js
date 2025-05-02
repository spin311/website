import {useLocation, useNavigate} from "react-router-dom";
import "./BackArrow.css";

function BackArrow() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        if (location.key === "default") {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <div>
            <div className="left-arrow-button" onClick={handleBackClick}>
                <img
                    className="left-arrow"
                    src={`${process.env.PUBLIC_URL}/assets/svgs/left-arrow.svg`}
                    alt="left arrow"
                />
            </div>
        </div>);
}
export default BackArrow;
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ImageTooltip.css"

function ImageTooltip({src}) {
    return (
        <div className="tooltip">
            <FontAwesomeIcon icon={faInfoCircle} className="tooltip-icon" />
            <img className="tooltip-image" src={`${process.env.PUBLIC_URL}/assets/images/${src}`} alt="tooltip steps" />
        </div>
    );

}

export default ImageTooltip;
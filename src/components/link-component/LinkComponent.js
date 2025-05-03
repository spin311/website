import {Link} from "react-router-dom";

function LinkComponent({href, children, classList='', internal = true}) {
    const isInternalLink = internal && href.startsWith("/");
    return (
        <>
            { isInternalLink ? <Link to={href} className={classList}>{children}</Link>
                :  <a href={href} className={classList} target={'_blank'} rel='noopener noreferrer'>{children}</a>}
        </>
    )
}

export default LinkComponent;
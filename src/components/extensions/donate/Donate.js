import {Helmet} from "react-helmet";
import {useLanguage} from "../../../context/LanguageContext";
import HomeArrow from "../../home-arrow/HomeArrow";

function Donate({soloComponent=false, className=''}) {
    const { text, formatHtml } = useLanguage();
    return (
        <>
            {soloComponent &&
                <>
                    <Helmet>
                        <title>Donate</title>
                        <meta name="description" content="Donate reasons and ways to donate" />
                    </Helmet>
                    <HomeArrow/>
                </>
            }
            <div id="donate" className={soloComponent ? `center ${className}` : className}>
                <div  className={soloComponent ? 'solo' : ''}>
                    <h2>{text.GENERAL.donate}</h2>
                    <p>{formatHtml(text.MICROSOFT.donate_explanation)}</p>
                    <ul>
                        <li>{formatHtml(text.MICROSOFT.donate1)}</li>
                        <li>{formatHtml(text.MICROSOFT.donate2)}</li>
                        <li>{formatHtml(text.MICROSOFT.donate3)}</li>
                    </ul>
                    <p>{formatHtml(text.MICROSOFT.donation_request)}</p>
                    <form action="https://www.paypal.com/donate" method="post" target="_blank">
                        <input type="hidden" name="hosted_button_id" value="4WXEWMN3QGLGY"/>
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                               name="submit" title="PayPal - The safer, easier way to pay online!"
                               alt="Donate with PayPal button"/>
                        <img alt="" border="0" src="https://www.paypal.com/en_SI/i/scr/pixel.gif" width="1" height="1"
                        />
                    </form>
                </div>

            </div>
        </>

    );
}

export default Donate;
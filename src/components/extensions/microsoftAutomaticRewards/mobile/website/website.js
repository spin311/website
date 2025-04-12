import {useLanguage} from "../../../../../context/LanguageContext";
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import "./website.css"
import {Helmet} from "react-helmet";
import {title} from "framer-motion/m";
import HomeArrow from "../../../../home-arrow/HomeArrow";
import {generate} from 'random-words';
import ImageTooltip from "../../../../image-tooltip/ImageTooltip";


function isValueNotSet(value) {
    return value === null || value === undefined;
}


function Website() {
    const stop = useRef(false);
    const {text} = useLanguage();
    const [searchParams] = useSearchParams();
    const [inputs, setInputs] = useState(() => {
        const searchNu = parseInt(searchParams.get("searchNu"));
        if (searchNu) {
            const searchDelay = parseInt(searchParams.get("delay"));
            return {searchNu, searchDelay};
        } else {
            const savedInputs = localStorage.getItem('websiteFormInputs');
            return savedInputs
                ? JSON.parse(savedInputs)
                : { searchNu: 12, searchDelay: 7, isWordsSelected: true };
        }
    });

    const toggleWordsLetters = () => {
        setInputs(prev => ({
            ...prev,
            isWordsSelected: !prev.isWordsSelected
        }));
    };
    const BING_SEARCH_URL = "https://www.bing.com/search?q=";
    const BING_SEARCH_PARAMS = "&qs=n&form=QBLH&sp=-1";

    async function openRandomTab(useWords = true) {
        let query;
        if (useWords) {
            query =  generate({ min: 2, max: 3, join: " "});
        } else {
            query = generateRandomString();
        }
        const searchUrl = `${BING_SEARCH_URL}${encodeURIComponent(query)}${BING_SEARCH_PARAMS}`;
        window.open(searchUrl, "_blank");
    }

    function stopSearch() {
        stop.current = true;
    }

    function generateRandomString() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * 3) + 5;
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }

    function getRandomNumber(min = 100, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function delay(ms, stopRef) {
        return new Promise(resolve => {
            const checkInterval = 100; // Check stop.current every 100ms
            let elapsedTime = 0;

            const intervalId = setInterval(() => {
                // Resolve immediately if stop.current becomes true
                if (stopRef.current || elapsedTime >= ms) {
                    clearInterval(intervalId);
                    resolve();
                }
                elapsedTime += checkInterval;
            }, checkInterval);
        });
    }

    async function openSearches() {
        setIsSending(true);
        try {
            for (let i = 0; i < inputs.searchNu; i++) {
                if (stop.current) break;
                await openRandomTab(inputs.isWordsSelected);
                await delay(inputs.searchDelay * 1000 + getRandomNumber(), stop);
            }
        } finally {
            setIsSending(false);
            stop.current = false;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (isSending) {
            stopSearch();
        } else {
            await openSearches();
        }
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = parseInt(event.target.value);
        setInputs(() => ({...inputs, [name] :value}));
    }
    const [isSending, setIsSending] = useState(false);
    const [disabledSend, setDisabledSend] = useState(false);

    useEffect(() => {
        setDisabledSend(
            isValueNotSet(inputs.searchNu) || isValueNotSet(inputs.searchDelay)
        );
    }, [inputs]);

    useEffect(() => {
        localStorage.setItem('websiteFormInputs', JSON.stringify(inputs));
    }, [inputs]);

    return (
        <>
            <Helmet>
                <title>Microsoft Rewards Website</title>
                <meta name="description" content="Microsoft Automatic Rewards Website"/>
            </Helmet>
            <HomeArrow/>
            <div className="website center">
                <div className="solo">
                    <h1>{text.WEBSITE.title}</h1>
                    <p>{text.WEBSITE.description}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="website-input">
                            <label htmlFor="searchNu">{text.WEBSITE.search_nu}</label>
                            <input type="number" id="searchNu" name="searchNu" onChange={handleChange} value={inputs.searchNu} />
                        </div>
                        <div className="website-input">
                            <label htmlFor="searchDelay">{text.WEBSITE.search_delay} (s)</label>
                            <input type="number" id="searchDelay" name="searchDelay" onChange={handleChange} value={inputs.searchDelay} />
                        </div>

                        <span>Use random:</span>
                        <div className="toggle-switch-container">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={!inputs.isWordsSelected}
                                    onChange={toggleWordsLetters}
                                />
                                <span className="slider">
                          <span className="option words">Words</span>
                          <span className="option letters">Letters</span>
                        </span>
                            </label>
                        </div>
                        <span className="gray-text">{text.WEBSITE.allow_popup}  <ImageTooltip src='enable-popup.png'/></span>

                        <button type="submit"
                                disabled={disabledSend}
                                data-tooltip-id="disabled-btn-tooltip"
                                data-tooltip-content={text.CONTACT.disabled_tooltip}
                                data-tooltip-place="right"
                                className={isSending ? 'gray' : ''}
                        >
                            {isSending ? text.WEBSITE.stop_searches : text.WEBSITE.get_rewards }
                        </button>
                        {disabledSend && <Tooltip id="disabled-btn-tooltip"/>}
                    </form>
                </div>
            </div>
        </>

    );

}
export default Website;
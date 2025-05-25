import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Helmet } from "react-helmet";
import { generate } from "random-words";

import BackArrow from "../../../../back-arrow/BackArrow";
import ImageTooltip from "../../../../image-tooltip/ImageTooltip";
import useIsMobile from "../../../../../hooks/useIsMobile";
import { useLanguage } from "../../../../../context/LanguageContext";

import "./website.css";

type Inputs = {
  searchNu: number;
  searchDelay: number;
  isWordsSelected: boolean;
};

function isValueNotSet(value: string | null | undefined | number): boolean {
  return value === null || value === undefined;
}

function Website() {
  const stop = useRef(false);
  const { text } = useLanguage();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const [inputs, setInputs] = useState<Inputs>(() => {
    const searchNuStr = searchParams.get("searchNu");
    const searchNu = searchNuStr ? parseInt(searchNuStr, 10) : 0;

    if (searchNu) {
      const searchDelayStr = searchParams.get("delay");
      const searchDelay = searchDelayStr ? parseInt(searchDelayStr, 10) : 0;
      return { searchNu, searchDelay, isWordsSelected: true };
    }

    const savedInputs = localStorage.getItem("websiteFormInputs");
    return savedInputs
      ? (JSON.parse(savedInputs) as Inputs)
      : { searchNu: 12, searchDelay: 7, isWordsSelected: true };
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [disabledSend, setDisabledSend] = useState<boolean>(false);

  const toggleWordsLetters = () => {
    setInputs((prev) => ({
      ...prev,
      isWordsSelected: !prev.isWordsSelected,
    }));
  };

  const BING_SEARCH_URL = "https://www.bing.com/search?q=";
  const BING_SEARCH_PARAMS = "&qs=n&form=QBLH&sp=-1&pq=";

  function openRandomTab(useWords = true): void {
    const query = useWords
      ? generate({ min: 2, max: 3, join: " " })
      : generateRandomString();

    const searchUrl = `${BING_SEARCH_URL}${encodeURIComponent(query)}${BING_SEARCH_PARAMS}`;
    window.open(searchUrl, "_blank");
  }

  function stopSearch(): void {
    stop.current = true;
  }

  function generateRandomString(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 3) + 5;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  function getRandomNumber(min = 100, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function delay(
    ms: number,
    stopRef?: RefObject<boolean>,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInterval = 100;
      let elapsedTime = 0;

      const intervalId = setInterval(() => {
        if (stopRef?.current || elapsedTime >= ms) {
          clearInterval(intervalId);
          resolve();
        }
        elapsedTime += checkInterval;
      }, checkInterval);
    });
  }

  async function openSearches(): Promise<void> {
    setIsSending(true);
    try {
      for (let i = 0; i < inputs.searchNu; i++) {
        if (stop.current) {
          break;
        }
        openRandomTab(inputs.isWordsSelected);
        await delay(inputs.searchDelay * 1000 + getRandomNumber(), stop);
      }
    } finally {
      setIsSending(false);
      stop.current = false;
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (isSending) {
      stopSearch();
    } else {
      await openSearches();
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name as keyof Inputs;
    const value = parseInt(event.target.value);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setDisabledSend(
      isValueNotSet(inputs.searchNu) || isValueNotSet(inputs.searchDelay),
    );
  }, [inputs]);

  useEffect(() => {
    localStorage.setItem("websiteFormInputs", JSON.stringify(inputs));
  }, [inputs]);

  return (
    <>
      <Helmet>
        <title>Microsoft Rewards Website</title>
        <meta
          name="description"
          content="Microsoft Automatic Rewards Website"
        />
      </Helmet>
      <BackArrow />
      <div className="website center">
        <div className="solo">
          <h1>{text.WEBSITE.title ?? "Microsoft Rewards"}</h1>
          <div className="website-header">
            {!isMobile && (
              <div className="qr-code-with-text">
                <img
                  src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/qr-code-colored.svg`}
                  alt="QR code"
                  className="qr-code"
                />
                <span>{text.WEBSITE.scan ?? "Scan QR code"}</span>
              </div>
            )}
            <Link
              className="website-phone"
              to="/microsoft-automatic-rewards/mobile/test-app"
            >
              <img
                className="website-phone-image"
                src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/mar-phone.png`}
                alt="Microsoft Automatic Rewards Phone App"
              />
              <div>{text.MICROSOFT.download ?? "Download App"}</div>
            </Link>
          </div>

          <p>{text.WEBSITE.description ?? "Start earning with Bing."}</p>

          <form onSubmit={() => void handleSubmit}>
            <div className="website-input">
              <label htmlFor="searchNu">{text.WEBSITE.search_nu}</label>
              <input
                type="number"
                id="searchNu"
                name="searchNu"
                onChange={handleChange}
                value={inputs.searchNu}
              />
            </div>
            <div className="website-input">
              <label htmlFor="searchDelay">
                {text.WEBSITE.search_delay} (s)
              </label>
              <input
                type="number"
                id="searchDelay"
                name="searchDelay"
                onChange={handleChange}
                value={inputs.searchDelay}
              />
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
            {!isMobile && (
              <span className="gray-text">
                {text.WEBSITE.allow_popup}{" "}
                <ImageTooltip src="enable-popup.png" />
              </span>
            )}

            <button
              type="submit"
              disabled={disabledSend}
              data-tooltip-id="disabled-btn-tooltip"
              data-tooltip-content={text.CONTACT.disabled_tooltip}
              data-tooltip-place="right"
              className={isSending ? "gray" : ""}
            >
              {isSending
                ? text.WEBSITE.stop_searches
                : text.WEBSITE.get_rewards}
            </button>
            {disabledSend && <Tooltip id="disabled-btn-tooltip" />}
          </form>
        </div>
      </div>
    </>
  );
}
export default Website;

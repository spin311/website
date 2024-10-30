import {useLanguage} from "../../context/LanguageContext";

function Footer() {
    let {text} = useLanguage();
  return (
    <footer id="contact">
      <p>{text.GENERAL.made_with} © 2024</p>
    </footer>
  );
}
export default Footer;
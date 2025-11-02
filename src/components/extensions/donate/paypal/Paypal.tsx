import React from "react";

function Paypal() {
  return (
    <div className="donation-card">
      <div className="donation-title">
        PayPal
        <img
          className="donate-svg"
          src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/paypal.svg`}
          alt="paypal"
        />
      </div>
      <form
        action="https://www.paypal.com/donate"
        method="post"
        target="_blank"
        style={{ margin: 0 }}
      >
        <input type="hidden" name="hosted_button_id" value="4WXEWMN3QGLGY" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          name="submit"
          title="Donate with PayPal"
          alt="Donate with PayPal button"
          style={{ border: "none" }}
        />
        <img
          alt=""
          src="https://www.paypal.com/en_SI/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  );
}

export default Paypal;

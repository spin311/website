import "./Privacy.css";
import { Helmet } from "react-helmet";
import React from "react";

function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Privacy Policy for Microsoft Automatic Rewards app"
        />
      </Helmet>
      <div className="terms">
        <h1 className="titles">
          Privacy Policy for Microsoft Automatic Rewards
        </h1>
        <p>
          <strong>Effective Date:</strong> April 16, 2025
        </p>

        <p>
          This app, <strong>Microsoft Automatic Rewards</strong>, is a
          third-party utility designed to automate Bing searches for users
          participating in the Microsoft Rewards program.
        </p>

        <h2 className="titles">1. Information We Collect</h2>
        <p>
          We do <strong>not</strong> collect, store, or transmit any personally
          identifiable information (PII) from users.
        </p>

        <h2 className="titles">2. How the App Works</h2>
        <p>
          The app opens Bing search tabs automatically based on preconfigured or
          randomized queries. It operates locally on the device and does not
          interact with any external servers or APIs, other than opening
          bing.com via the default browser.
        </p>

        <h2 className="titles">3. Data Usage</h2>
        <ul>
          <li>
            No search terms, cookies, or user data are collected or stored.
          </li>
          <li>
            The app does not access or transmit Microsoft account information.
          </li>
          <li>No analytics or third-party tracking tools are used.</li>
        </ul>

        <h2 className="titles">4. Permissions</h2>
        <p>
          This app uses internet access solely to open Bing search pages. No
          other permissions are required or used.
        </p>

        <h2 className="titles">5. Children’s Privacy</h2>
        <p>
          Target audience is 13 years old and older. We do not knowingly collect
          or store data from users
        </p>

        <h2 className="titles">6. Third-party Services</h2>
        <p>
          This app is not affiliated with, endorsed by, or supported by
          Microsoft Corporation. Microsoft® and Bing® are registered
          trademarks of Microsoft.
        </p>

        <h2 className="titles">7. Contact</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:{" "}
          <a href="mailto:spin311pro@gmail.com">spin311pro@gmail.com</a>
        </p>
      </div>
    </>
  );
}

export default Privacy;


# 🧭 React UTM Tracker

[![npm version](https://img.shields.io/npm/v/react-utm-tracker.svg)](https://www.npmjs.com/package/react-utm-tracker)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![bundle size](https://img.shields.io/bundlephobia/minzip/react-utm-tracker.svg)](https://bundlephobia.com/result?p=react-utm-tracker)

Lightweight, privacy-compliant React library for capturing and managing UTM parameters easily.

---
## ✨ Features

✅ **Automatically detects and stores UTM parameters** (utm_source, utm_medium, utm_campaign, etc.)  
✅ **Lightweight** — <5 KB gzipped, no external dependencies  
✅ **Privacy-safe** (Secure; SameSite=Lax cookies, consent-aware)  
✅ **Works with any React app** (React 17+)  
✅ **Easy to integrate** — just wrap your app with `<UTMProvider>`  
✅ **Customizable** capture keys, expiry, and consent control  
✅ **API utilities:** `useUTM()` and `deleteUTMCookie()`

## 🚀 Installation

```bash
# npm
npm install react-utm-tracker

# yarn
yarn add react-utm-tracker

# pnpm
pnpm add react-utm-tracker
````


## ⚡ Quick Start

### 1️⃣ Wrap your app with the provider

```jsx
import { UTMProvider } from "react-utm-tracker";
import MainApp from "./MainApp";

function App() {
  return (
    <UTMProvider>
      <MainApp />
    </UTMProvider>
  );
}

export default App;
```

### 2️⃣ Access UTMs anywhere in your app

```jsx
import { useUTM } from "react-utm-tracker";

function Dashboard() {
  const utm = useUTM();

  return (
    <div>
      <h3>User UTM Data</h3>
      <pre>{JSON.stringify(utm, null, 2)}</pre>
    </div>
  );
}
```

### 3️⃣ Clear UTM cookies when needed

```jsx
import { deleteUTMCookie } from "react-utm-tracker";

function LogoutButton() {
  return (
    <button onClick={() => deleteUTMCookie()}>
      Clear All UTM Data
    </button>
  );
}
```

## ⚙️ Configuration (Props for `<UTMProvider>`)

| Prop              | Type        | Default                                                                       | Description                                                        |
| ----------------- | ----------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `captureParams`   | `string[]`  | `['utm_source','utm_medium','utm_campaign','utm_term','utm_content']`           | Whitelisted URL parameters to capture.                             |
| `cookieExpiryDays`| `number`    | `30`                                                                          | Number of days before cookies expire.                              |
| `requireReferrer` | `boolean`   | `false`                                                                       | Capture UTMs only if the visitor came from another referrer.       |
| `requireConsent`  | `boolean`   | `false`                                                                       | Enables GDPR-style consent check; no cookies are set until granted.|
| `consentGiven`    | `boolean`   | `true`                                                                        | Whether user consent has been granted (used with `requireConsent`).|

## 🧩 Example – Full Custom Configuration

Here's an example of how to implement a consent banner and customize the provider.

```jsx
import { useState } from 'react';
import { UTMProvider, useUTM, deleteUTMCookie } from "react-utm-tracker";

// A simple banner to get user consent
function ConsentBanner({ onAccept }) {
  return (
    <div className="consent-banner">
      <p>We use cookies to track marketing performance.</p>
      <button onClick={onAccept}>Accept</button>
    </div>
  );
}

export default function App() {
  const [consent, setConsent] = useState(false);

  return (
    <>
      {!consent && <ConsentBanner onAccept={() => setConsent(true)} />}
      <UTMProvider
        captureParams={['utm_source', 'utm_medium', 'utm_campaign']}
        cookieExpiryDays={14}
        requireReferrer={true}
        requireConsent={true}
        consentGiven={consent}
      >
        <MainApp />
      </UTMProvider>
    </>
  );
}

function MainApp() {
  const utm = useUTM();

  return (
    <div>
      <h2>Captured UTMs:</h2>
      <pre>{JSON.stringify(utm, null, 2)}</pre>
      <button onClick={() => deleteUTMCookie(['utm_source'])}>
        Delete Only utm_source
      </button>
    </div>
  );
}
```

## 🔧 API Reference

### 🧱 `UTMProvider`

The main provider component that wraps your app and automatically detects UTMs from the URL.

```jsx
<UTMProvider
  captureParams={['utm_source', 'utm_campaign']}
  cookieExpiryDays={30}
  requireReferrer={false}
  requireConsent={true}
  consentGiven={cookieConsent}
>
  {children}
</UTMProvider>
```

### 🪣 `useUTM()`

A React hook that returns an object of the stored UTM key-value pairs.

```jsx
const utm = useUTM();

console.log(utm);
/*
{
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "spring_sale"
}
*/
```

### 🧹 `deleteUTMCookie(names?: string[])`

A utility function to delete UTM cookies.

| Usage                             | Description                                  |
| --------------------------------- | -------------------------------------------- |
| `deleteUTMCookie()`               | Deletes all UTM cookies set by this library. |
| `deleteUTMCookie(['utm_source'])` | Deletes only the specified UTM cookies.      |

Cookies are removed securely with `path=/; SameSite=Lax; Secure`.

## 🛡️ Privacy & Compliance

✅ **GDPR-ready:** No cookies are set until consent is given when using `requireConsent={true}`.  
✅ **CCPA/LGPD:** Supports user-initiated data deletion via `deleteUTMCookie()`.  
✅ **Security:** Cookies are set with `Secure` and `SameSite=Lax` flags by default.  
✅ **Transparency:** All cookies created by this library are prefixed with `utm_` for easy identification.

## 📦 Storage & Persistence

  - **Default storage:** Cookies.
  - Each cookie name is the same as the UTM parameter (e.g., `utm_source`, `utm_medium`).
  - Expiry is controlled via the `cookieExpiryDays` prop on the provider.

## 🧠 Common Use-Cases

  - Persist UTM parameters across a user's session to attribute sign-ups or purchases.
  - Send UTM data with form submissions to your backend.
  - Forward UTM data to analytics, CRM, or payment provider payloads.
  - Attribute marketing campaign effectiveness in custom internal dashboards.
  - Respect user privacy regulations out-of-the-box with consent management.

## 🧪 Local Testing

If you have cloned the repository and want to test it locally:

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Build the library:

    ```bash
    npm run build
    ```

3.  Navigate to the test application:

    ```bash
    cd test-app
    npm run dev
    ```

4.  Then open the following URL in your browser to see the UTM parameters captured:

    👉 `http://localhost:<your-localhost-port>/?utm_source=google&utm_medium=cpc&utm_campaign=demo`

## 📜 License

MIT © 2025 Debangan Paul Chowdhury

Feel free to use, modify, and distribute.

## ❤️ Contributing

Contributions, issues, and feature requests are welcome\! Please feel free to open issues or pull requests on the [GitHub repository](https://github.com/debangan202ok/react-utm-tracker).


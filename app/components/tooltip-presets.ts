import { ReactComponent as DwollaBalanceIcon } from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-white-48x48.svg";
import { ReactComponent as DwollaConnectIcon } from "../../assets/images/product-icons-and-heroes/dwolla-connect-icon-white-48x48.svg";
import { ReactComponent as SandboxIcon } from "../../assets/images/component-icons/side-nav/testing-sandbox.svg";

export default {
  presets: {
    customer: {
      content:
        "A type of end-user, either business or personal, that identifies the owner of the underlying bank account used in an account-to-account payment. A Customer is required in order to initiate a transfer to or from a user's bank account.",
      title: "Customer",
    },
    "dwolla-balance": {
      content:
        "Dwolla Balance is a digital wallet-based solution that lets you and your users hold funds and initiate payments.",
      icon: DwollaBalanceIcon,
      title: "Dwolla Balance",
    },
    "dwolla-connect": {
      content:
        "Dwolla Connect leverages your existing banking relationships and corresponding commercial bank accounts to integrate modern payment processing capabilities into your operations.",
      icon: DwollaConnectIcon,
      title: "Dwolla Connect",
    },
    exchange: {
      content:
        "A secure connection between Dwolla and a trusted ecosystem partner, facilitating the transfer of tokenized financial data needed to verify and create a bank funding source.",
      title: "Exchange",
    },
    "exchange-session": {
      content:
        "A secure session initiated between Dwolla and an Open Banking provider to facilitate the Instant Account Verification (IAV) process, allowing users to authenticate and verify their bank accounts.",
      title: "Exchange Session",
    },
    "external-party": {
      content:
        "A type of end-user, either business or personal, that identifies the owner of the underlying bank account used in an account-to-account payment. An External Party is required in order to initiate a transfer to or from a user's bank account.",
      title: "External Party",
    },
    "funding-source": {
      content:
        "A linked bank account that allows you to send and receive account-to-account payments with another party. It is identified by a unique account and routing number, and is typically associated with a checking or savings account.",
      title: "Funding Source",
    },
    "idempotency-key": {
      content:
        "Use a unique key in the API request header to prevent duplicate operations in Dwolla.",
      title: "Idempotency key",
    },
    "openapi-spec": {
      content:
        "A standardized interface description for HTTP/REST APIs, facilitating understanding without source code access. Can be combined with additional tooling, such as generating documentation, a Postman collection, or a Software Development Kit.",
      title: "Open API Specification",
    },
    sandbox: {
      content:
        "A simulated environment where you can imitate production/“live” use cases, safely test your API requests and responses in a controlled setting, and mock out low-volume and high volume data.",
      icon: SandboxIcon,
      title: "Sandbox",
    },
    "secure-exchange": {
      content:
        "A secure data exchange that connects Dwolla to trusted Open Finance ecosystem partners, enabling tokenized access to services such as bank account ownership verification.",
      title: "Secure Exchange",
    },
    "treasury-account": {
      content:
        "An identifiable “connection” between Dwolla and a supported Treasury Partner, identified by your ACH Company ID or Gateway Company ID, depending on the banking institution.",
      title: "Treasury Account",
    },
    webhook: {
      content:
        "An HTTP request sent to a specified URL for near real-time updates and notifications when specific events or data changes occur in the Dwolla platform.",
      title: "Webhook",
    },
  },
} as const;

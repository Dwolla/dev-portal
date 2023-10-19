import { ReactComponent as DwollaBalanceIcon } from "../../assets/images/product-icons-and-heroes/dwolla-balance-icon-white-48x48.svg";
import { ReactComponent as DwollaConnectIcon } from "../../assets/images/product-icons-and-heroes/dwolla-connect-icon-white-48x48.svg";
import { ReactComponent as SandboxIcon } from "../../assets/images/component-icons/side-nav/testing-sandbox.svg";

export default {
  presets: {
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
    "external-party": {
      content:
        "A type of Dwolla account, either business or personal, that identifies your end-users. An External Party is required in order to initiate a transfer to a customer’s bank account.",
      title: "External Party",
    },
    "funding-source": {
      content:
        "A linked bank account that can be used to route funds to a Dwolla Account or External Party, denoted by the use of an account and routing number, most often connected to a checking or savings account.",
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
        "A simulation of Dwolla's production environment, complete with all API endpoints, but without real banking or user data.",
      icon: SandboxIcon,
      title: "Sandbox",
    },
    "secure-exchange": {
      content:
        "A secure data-sharing channel between your Dwolla account and Dwolla's ecosystem partners, enabling controlled access, such as connecting a verified bank account, without sensitive data storage.",
      title: "Secure Exchange",
    },
    "treasury-account": {
      content:
        " An identifiable “connection” between Dwolla and a supported Treasury Partner, identified by your ACH Company ID or Gateway Company ID, depending on the banking institution.",
      title: "Treasury Account",
    },
  },
} as const;

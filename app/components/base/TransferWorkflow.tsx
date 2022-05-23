/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ordinal from "ordinal";
import FundsFlowSelector from "./FundsFlowSelector";
import WebhookCodeBlock from "./WebhookCodeBlock";
import TimelineNav from "./TimelineNav";
import Button from "./Button";
import { GREY_1, GREY_3, HEADLINE_TEXT, PURPLE_DARK } from "../colors";
import { breakDown } from "../breakpoints";
import { POPPINS, ROBOTO } from "../typography";

// Import JSON data to be used in the interactive component
import a1 from "../../../assets/transfer-workflow-data/a1-account-bank-to-account-balance.json";
import a2 from "../../../assets/transfer-workflow-data/a2-account-bank-to-ro-bank.json";
import a3 from "../../../assets/transfer-workflow-data/a3-account-bank-to-cr-bank.json";
import a4 from "../../../assets/transfer-workflow-data/a4-account-bank-to-vcr-balance.json";
import a5 from "../../../assets/transfer-workflow-data/a5-account-bank-to-vcr-bank.json";
import a6 from "../../../assets/transfer-workflow-data/a6-account-balance-to-account-bank.json";
import a7 from "../../../assets/transfer-workflow-data/a7-account-balance-to-ro-bank.json";
import a8 from "../../../assets/transfer-workflow-data/a8-account-balance-to-cr-bank.json";
import a9 from "../../../assets/transfer-workflow-data/a9-account-balance-to-vcr-balance.json";
import a10 from "../../../assets/transfer-workflow-data/a10-account-balance-to-vcr-bank.json";
import c1 from "../../../assets/transfer-workflow-data/c1-cr-bank-to-account-balance.json";
import c2 from "../../../assets/transfer-workflow-data/c2-cr-bank-to-account-bank.json";
import c3 from "../../../assets/transfer-workflow-data/c3-cr-bank-to-vcr-balance.json";
import c4 from "../../../assets/transfer-workflow-data/c4-cr-bank-to-vcr-bank.json";
import v1 from "../../../assets/transfer-workflow-data/v1-vcr-bank-to-account-balance.json";
import v2 from "../../../assets/transfer-workflow-data/v2-vcr-bank-to-account-bank.json";
import v3 from "../../../assets/transfer-workflow-data/v3-vcr-bank-to-ro-bank.json";
import v4 from "../../../assets/transfer-workflow-data/v4-vcr-bank-to-cr-bank.json";
import v5 from "../../../assets/transfer-workflow-data/v5-vcr-bank-to-vcr-balance.json";
import v6 from "../../../assets/transfer-workflow-data/v6-vcr-bank-to-vcr-bank.json";
import v7 from "../../../assets/transfer-workflow-data/v7-vcr-balance-to-master-balance.json";
import v8 from "../../../assets/transfer-workflow-data/v8-vcr-balance-to-vcr-bank.json";
import v9 from "../../../assets/transfer-workflow-data/v9-vcr-balance-to-ro-bank.json";
import v10 from "../../../assets/transfer-workflow-data/v10-vcr-balance-to-cr-bank.json";
import v11 from "../../../assets/transfer-workflow-data/v11-vcr-balance-to-vcr-balance.json";
import v12 from "../../../assets/transfer-workflow-data/v12-vcr-balance-to-vcr-bank.json";

// styles

const StyledContainer = styled.div`
  max-width: 791px;
  border: 1px solid ${GREY_3};
  box-sizing: border-box;
  border-radius: 5px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (${breakDown("md")}) {
    width: auto;
  }
  @media (${breakDown("sm")}) {
    width: 100%;
    margin: 0;
  }
`;

const StyledTimelineContainer = styled.div`
  width: 100%;
  height: 81px;
  background: ${GREY_1};
  border-bottom: 1px solid ${GREY_3};
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.div`
  margin: auto;
  font-family: ${POPPINS};
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${GREY_3};
  color: ${PURPLE_DARK};
`;

const StyledTitle = styled.div`
  height: 33px;
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${HEADLINE_TEXT};
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.02em;
  margin: auto auto 7px auto;
`;

const StyledDescription = styled.div`
  max-width: 411px;
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${HEADLINE_TEXT};
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.02em;
  margin: 7px auto 28px auto;
`;

const StyledCodeBlockContainer = styled.div`
  max-width: 90%;
  margin-top: 9px;
  margin-bottom: 9px;
  @media (${breakDown("sm")}) {
    width: 100%;
  }
`;

const StyledBottomContainer = styled.div`
  width: 100%;
  height: 81px;
  border-top: 1px solid ${GREY_3};
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 20px;
  margin-top: 27px;
`;

// selectable options for FundsFlowSelector component

const senderTypeOptions = [
  {
    value: "account",
    label: "Account",
    sources: ["balance", "bank"],
    canTransactWith: ["vcr", "cr", "ro"],
  },
  {
    value: "vcr",
    label: "Verified Customer",
    sources: ["balance", "bank"],
    canTransactWith: ["account", "vcr", "cr", "ro"],
  },
  {
    value: "cr",
    label: "Unverified Customer",
    sources: ["bank"],
    canTransactWith: ["account", "vcr"],
  },
];

const senderSourceOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
];

const receiverTypeOptions = [
  { value: "account", label: "Account", destinations: ["balance", "bank"] },
  {
    value: "vcr",
    label: "Verified Customer",
    destinations: ["balance", "bank"],
  },
  { value: "cr", label: "Unverified Customer", destinations: ["bank"] },
  { value: "ro", label: "Receive-Only User", destinations: ["bank"] },
];

const receiverDestinationOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
];

// possible Funds Flow combinations

const fundsFlowCombinations = {
  account: {
    a1: ["account", "bank", "account", "balance"],
    a2: ["account", "bank", "ro", "bank"],
    a3: ["account", "bank", "cr", "bank"],
    a4: ["account", "bank", "vcr", "balance"],
    a5: ["account", "bank", "vcr", "bank"],
    a6: ["account", "balance", "account", "bank"],
    a7: ["account", "balance", "ro", "bank"],
    a8: ["account", "balance", "cr", "bank"],
    a9: ["account", "balance", "vcr", "balance"],
    a10: ["account", "balance", "vcr", "bank"],
  },
  cr: {
    c1: ["cr", "bank", "account", "balance"],
    c2: ["cr", "bank", "account", "bank"],
    c3: ["cr", "bank", "vcr", "balance"],
    c4: ["cr", "bank", "vcr", "bank"],
  },
  vcr: {
    v1: ["vcr", "bank", "account", "balance"],
    v2: ["vcr", "bank", "account", "bank"],
    v3: ["vcr", "bank", "ro", "bank"],
    v4: ["vcr", "bank", "cr", "bank"],
    v5: ["vcr", "bank", "vcr", "balance"],
    v6: ["vcr", "bank", "vcr", "bank"],
    v7: ["vcr", "balance", "account", "balance"],
    v8: ["vcr", "balance", "account", "bank"],
    v9: ["vcr", "balance", "ro", "bank"],
    v10: ["vcr", "balance", "cr", "bank"],
    v11: ["vcr", "balance", "vcr", "balance"],
    v12: ["vcr", "balance", "vcr", "bank"],
  },
};

// TransferWorkflow component

function TransferWorkflow() {
  const [allowedSenderSources, setAllowedSenderSources] = useState(null);
  const [allowedReceiverDestinations, setAllowedReceiverDestinations] =
    useState(null);
  const [allowedReceivers, setAllowedReceivers] = useState(null);
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedFundsFlow, setSelectedFundsFlow] = useState([]);
  const [unsupportedFundsFlow, setUnsupportedFundsFlow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [webhookJsonData, setWebhookJsonData] = useState<any | undefined>(
    undefined
  );

  /**
   * Update `allowedSenderSources` when a Sender Type updates. This will allow the
   * Sender Source to get updated with only options that are allowed for a given workflow.
   *
   * For example, if the user selects Unverified Customer as their Sender Type, then only
   * Bank should be shown as a Sender Source option, since Balance is would be an illegal value.
   */
  function handleSenderChanged(sender): void {
    setSelectedSender(sender);
    setAllowedSenderSources(
      senderSourceOptions.filter(({ value }) => sender.sources.includes(value))
    );
    /**
     * Update `allowedReceivers` to only include the Receiver Types that a Sender is able to
     * transact with. For example, when a CR is selected as the Sender, the Receiver options will
     * be limited to Account and VCR.
     */
    setAllowedReceivers(
      receiverTypeOptions.filter(({ value }) =>
        sender.canTransactWith.includes(value)
      )
    );
  }

  /**
   * Similar to `handleSenderChanged`, update `allowedReceiverDestinations` when a Receiver Type
   * updates. This will allow the Receiver Destination to get updated with only options that are
   * allowed for a given workflow.
   */
  function handleReceiverChanged(reciever): void {
    setSelectedReceiver(reciever);
    setAllowedReceiverDestinations(
      receiverDestinationOptions.filter(({ value }) =>
        reciever.destinations.includes(value)
      )
    );
  }

  // function to handle Start button

  function handleStart() {
    setSelectedFundsFlow([
      selectedSender.value,
      selectedSource.value,
      selectedReceiver.value,
      selectedDestination.value,
    ]);
    setActiveStep(activeStep + 1);
  }

  function compareAndSetFundsFlow() {
    // switch case to compare selectedFundsFlow with fundsFlowCombinations
    // and assign the relevant JSON object to webhookJsonData

    if (selectedFundsFlow.length === 0) {
      setWebhookJsonData(undefined);
      setUnsupportedFundsFlow(false);
      return;
    }

    switch (selectedSender.value) {
      case "account":
        switch (selectedFundsFlow.toString()) {
          case fundsFlowCombinations.account.a1.toString():
            setWebhookJsonData(a1);
            break;
          case fundsFlowCombinations.account.a2.toString():
            setWebhookJsonData(a2);
            break;
          case fundsFlowCombinations.account.a3.toString():
            setWebhookJsonData(a3);
            break;
          case fundsFlowCombinations.account.a4.toString():
            setWebhookJsonData(a4);
            break;
          case fundsFlowCombinations.account.a5.toString():
            setWebhookJsonData(a5);
            break;
          case fundsFlowCombinations.account.a6.toString():
            setWebhookJsonData(a6);
            break;
          case fundsFlowCombinations.account.a7.toString():
            setWebhookJsonData(a7);
            break;
          case fundsFlowCombinations.account.a8.toString():
            setWebhookJsonData(a8);
            break;
          case fundsFlowCombinations.account.a9.toString():
            setWebhookJsonData(a9);
            break;
          case fundsFlowCombinations.account.a10.toString():
            setWebhookJsonData(a10);
            break;
          default:
            setUnsupportedFundsFlow(true);
            break;
        }
        break;
      case "cr":
        switch (selectedFundsFlow.toString()) {
          case fundsFlowCombinations.cr.c1.toString():
            setWebhookJsonData(c1);
            break;
          case fundsFlowCombinations.cr.c2.toString():
            setWebhookJsonData(c2);
            break;
          case fundsFlowCombinations.cr.c3.toString():
            setWebhookJsonData(c3);
            break;
          case fundsFlowCombinations.cr.c4.toString():
            setWebhookJsonData(c4);
            break;
          default:
            setUnsupportedFundsFlow(true);
            break;
        }
        break;
      case "vcr":
        switch (selectedFundsFlow.toString()) {
          case fundsFlowCombinations.vcr.v1.toString():
            setWebhookJsonData(v1);
            break;
          case fundsFlowCombinations.vcr.v2.toString():
            setWebhookJsonData(v2);
            break;
          case fundsFlowCombinations.vcr.v3.toString():
            setWebhookJsonData(v3);
            break;
          case fundsFlowCombinations.vcr.v4.toString():
            setWebhookJsonData(v4);
            break;
          case fundsFlowCombinations.vcr.v5.toString():
            setWebhookJsonData(v5);
            break;
          case fundsFlowCombinations.vcr.v6.toString():
            setWebhookJsonData(v6);
            break;
          case fundsFlowCombinations.vcr.v7.toString():
            setWebhookJsonData(v7);
            break;
          case fundsFlowCombinations.vcr.v8.toString():
            setWebhookJsonData(v8);
            break;
          case fundsFlowCombinations.vcr.v9.toString():
            setWebhookJsonData(v9);
            break;
          case fundsFlowCombinations.vcr.v10.toString():
            setWebhookJsonData(v10);
            break;
          case fundsFlowCombinations.vcr.v11.toString():
            setWebhookJsonData(v11);
            break;
          case fundsFlowCombinations.vcr.v12.toString():
            setWebhookJsonData(v12);
            break;
          default:
            setUnsupportedFundsFlow(true);
            break;
        }
        break;
      default:
        setUnsupportedFundsFlow(true);
        break;
    }
  }

  // Call compareAndSetFundsFlow every time selectedFundsFlow state changes
  useEffect(() => {
    compareAndSetFundsFlow();
  }, [selectedFundsFlow]);

  //  Back button logic: decrements activeStep and resets all states when activeStep is 1
  function handleBack() {
    if (activeStep === 1) {
      setSelectedFundsFlow([]);
      setUnsupportedFundsFlow(false);
      setWebhookJsonData(undefined);
      setAllowedSenderSources(null);
      setSelectedSender(null);
      setSelectedSource(null);
      setSelectedReceiver(null);
      setSelectedDestination(null);
    } else if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  }

  // Next button logic: Increments activeStep
  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  return (
    <StyledContainer>
      <StyledTimelineContainer>
        {webhookJsonData !== undefined ? (
          <div style={{ width: "100%" }}>
            <TimelineNav
              totalSteps={["Create transfer"].concat(
                webhookJsonData.webhooksArray.map((value, index) => {
                  return `${ordinal(index + 1)} leg`;
                })
              )}
              active={activeStep}
              setActive={setActiveStep}
            />
          </div>
        ) : (
          <StyledHeader>Select a funds flow</StyledHeader>
        )}
      </StyledTimelineContainer>
      {activeStep === 0 ? (
        // display FundsFlowSelector component when activeStep is 0
        <FundsFlowSelector
          senderTypeOptions={senderTypeOptions}
          senderSourceOptions={allowedSenderSources}
          receiverTypeOptions={allowedReceivers}
          receiverDestinationOptions={allowedReceiverDestinations}
          setSelectedSender={handleSenderChanged}
          setSelectedSource={setSelectedSource}
          setSelectedReceiver={handleReceiverChanged}
          setSelectedDestination={setSelectedDestination}
          isReceiverDisabled={!(selectedSender && selectedSource)}
        />
      ) : // check if Funds Flow is unsupported, otherwise display code block component
      unsupportedFundsFlow ? (
        <>
          <StyledTitle>Select a different funds flow.</StyledTitle>
          <StyledDescription>
            {selectedSender.label} <strong>{selectedSource.label}</strong> to{" "}
            {selectedReceiver.label}{" "}
            <strong>{selectedDestination.label}</strong> is not supported.
          </StyledDescription>
        </>
      ) : (
        webhookJsonData !== undefined && (
          <>
            <StyledTitle>
              {webhookJsonData.webhooksArray[activeStep - 1].stepTitle}
            </StyledTitle>
            <StyledDescription>
              {webhookJsonData.webhooksArray[activeStep - 1].stepDescription}
            </StyledDescription>
            {webhookJsonData.webhooksArray[activeStep - 1].set.map((json) => {
              return (
                <StyledCodeBlockContainer>
                  <WebhookCodeBlock
                    topic={json.webhookTopic}
                    senderOrReceiver={json.senderOrReceiver}
                    payload={json.webhookPayload}
                  />
                </StyledCodeBlockContainer>
              );
            })}
          </>
        )
      )}
      <StyledBottomContainer>
        {selectedFundsFlow.length === 0 ? (
          <Button
            text="Start"
            size="standard"
            variant="primary"
            onButtonClick={handleStart}
            isDisabled={
              !(
                selectedSender &&
                selectedSource &&
                selectedReceiver &&
                selectedDestination
              )
            }
          />
        ) : (
          activeStep !== 0 && (
            <>
              <Button
                text="Back"
                size="standard"
                variant="hollow-light"
                onButtonClick={handleBack}
              />
              {webhookJsonData && (
                <Button
                  text="Next"
                  size="standard"
                  variant="primary"
                  onButtonClick={handleNext}
                  isDisabled={
                    activeStep === webhookJsonData.webhooksArray.length
                  }
                />
              )}
            </>
          )
        )}
      </StyledBottomContainer>
    </StyledContainer>
  );
}

export default TransferWorkflow;

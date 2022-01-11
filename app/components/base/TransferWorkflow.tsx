/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import isEqual from "lodash.isequal";
import ordinal from "ordinal";
import FundsFlowSelector from "./FundsFlowSelector";
import WebhookCodeBlock from "./WebhookCodeBlock";
import TimelineNav from "./TimelineNav";
import Button from "./Button";
import { GREY_1, GREY_3, HEADLINE_TEXT, PURPLE_DARK } from "../colors";
import { breakDown } from "../breakpoints";
import { POPPINS, ROBOTO } from "../typography";
import VCRBanktoVCRBankdata from "../../../assets/transfer-workflow-data/v6-vcr-bank-to-vcr-bank.json";
import VCRBanktoCRBank from "../../../assets/transfer-workflow-data/v4-vcr-bank-to-cr-bank.json";

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
  max-width: 597px;
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
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
];

const senderSourceOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r01", label: "R01-Bank" },
];

const receiverTypeOptions = [
  { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  { value: "cr", label: "Unverified Customer" },
  { value: "ro", label: "Receive-Only User" },
];

const receiverDestinationOptions = [
  { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  { value: "r03", label: "R03-Bank" },
  { value: "card", label: "Debit Card" },
];

// possible Funds Flow combinations

const fundsFlowCombinations = {
  account: {
    m1: ["account", "bank", "account", "balance"],
    m2: ["account", "bank", "ro", "bank"],
    m3: ["account", "bank", "cr", "bank"],
    m4: ["account", "bank", "vcr", "balance"],
    m5: ["account", "bank", "vcr", "bank"],
    m6: ["account", "balance", "account", "bank"],
    m7: ["account", "balance", "ro", "bank"],
    m8: ["account", "balance", "cr", "bank"],
    m9: ["account", "balance", "vcr", "balance"],
    m10: ["account", "balance", "vcr", "bank"],
    m11: ["account", "balance", "ro", "card"],
    m12: ["account", "balance", "cr", "card"],
    m13: ["account", "balance", "vcr", "card"],
  },
  cr: {
    c1: ["cr", "bank", "account", "balance"],
    c2: ["cr", "bank", "account", "bank"],
    c3: ["cr", "bank", "vcr", "balance"],
    c4: ["cr", "bank", "vcr", "bank"],
  },
  vcr: {
    vcr1: ["vcr", "bank", "account", "balance"],
    vcr2: ["vcr", "bank", "account", "bank"],
    vcr3: ["vcr", "bank", "ro", "bank"],
    vcr4: ["vcr", "bank", "cr", "bank"],
    vcr5: ["vcr", "bank", "vcr", "balance"],
    vcr6: ["vcr", "bank", "vcr", "bank"],
    vcr7: ["vcr", "balance", "account", "balance"],
    vcr8: ["vcr", "balance", "account", "bank"],
    vcr9: ["vcr", "balance", "ro", "bank"],
    vcr10: ["vcr", "balance", "cr", "bank"],
    vcr11: ["vcr", "balance", "vcr", "balance"],
    vcr12: ["vcr", "balance", "vcr", "bank"],
  },
};

// TransferWorkflow component

function TransferWorkflow() {
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
    // if else condition to compare selectedFundsFlow with fundsFlowCombinations
    // and assign the relevant JSON object to webhookJsonData

    if (selectedFundsFlow.length === 0) {
      setWebhookJsonData(undefined);
      setUnsupportedFundsFlow(false);
      return;
    }

    if (selectedSender.value === "account") {
      //  TODO: Write if/else statements for all combinations + add JSON data
    } else if (selectedSender.value === "vcr") {
      if (isEqual(setSelectedFundsFlow, fundsFlowCombinations.vcr.vcr4)) {
        setWebhookJsonData(VCRBanktoCRBank);
      } else if (isEqual(selectedFundsFlow, fundsFlowCombinations.vcr.vcr6)) {
        setWebhookJsonData(VCRBanktoVCRBankdata);
      } else {
        setUnsupportedFundsFlow(true);
      }
    } else if (selectedSender.value === "cr") {
      // TODO: Write if/else statements for all combinations + add JSON data
    } else {
      setUnsupportedFundsFlow(true);
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
          senderSourceOptions={senderSourceOptions}
          receiverTypeOptions={receiverTypeOptions}
          receiverDestinationOptions={receiverDestinationOptions}
          setSelectedSender={setSelectedSender}
          setSelectedSource={setSelectedSource}
          setSelectedReceiver={setSelectedReceiver}
          setSelectedDestination={setSelectedDestination}
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
          // webhookJsonData &&
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

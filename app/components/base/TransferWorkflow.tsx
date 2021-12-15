import React, { useState } from "react";
import styled from "@emotion/styled";
import isEqual from "lodash.isequal";
import FundsFlowSelector from "./FundsFlowSelector";
import Button from "./Button";
import { GREY_1, GREY_3 } from "../colors";
import { breakDown } from "../breakpoints";
import VCRBanktoVCRBankdata from "../../../assets/transfer-workflow-data/vcr-bank-to-vcr-bank.json";

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
  margin-top: 50px;
`;

// selectable options for FundsFlowSelector component

const senderTypeOptions = [
  // { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  // { value: "cr", label: "Unverified Customer" },
];

const senderSourceOptions = [
  // { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  // { value: "r01", label: "R01-Bank" },
];

const receiverTypeOptions = [
  // { value: "account", label: "Account" },
  { value: "vcr", label: "Verified Customer" },
  // { value: "cr", label: "Unverified Customer" },
  // { value: "ro", label: "Receive-Only User" },
];

const receiverDestinationOptions = [
  // { value: "balance", label: "Balance" },
  { value: "bank", label: "Bank" },
  // { value: "r03", label: "R03-Bank" },
  // { value: "card", label: "Debit Card" },
];

// possible Funds Flow combinations

const fundsFlowCombinations = {
  one: ["vcr", "bank", "vcr", "bank"],
  // all possible comibnations as arrays, for example,
  // two: ["vcr", "balance", "vcr", "bank"]
  // three: ["cr", "bank", "vcr", "bank"]
};

// TransferWorkflow component

function TransferWorkflow() {
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedFundsFlow, setSelectedFundsFlow] = useState([]);

  // remove eslint comment once variable is used
  // eslint-disable-next-line no-unused-vars
  let webhooksData;

  // function to handle Start button

  function handleStart() {
    // sets the funds flow in the selectedFundsFlow state
    if (selectedFundsFlow.length === 0) {
      setSelectedFundsFlow([
        selectedSender.value,
        selectedSource.value,
        selectedReceiver.value,
        selectedDestination.value,
      ]);
    }

    // if else condition to compare selectedFundsFlow with fundsFlowCombinations
    // and assign the relevant JSON object to webhooksData
    if (isEqual(selectedFundsFlow, fundsFlowCombinations.one)) {
      webhooksData = VCRBanktoVCRBankdata;
    }
    // example else if statement
    // else if (isEqual(selectedFundsFlow, fundsFlowCombinations.two)) {
    //   webhooksData = VCRBalancetoVCRBankdata;
    // }
  }

  return (
    <StyledContainer>
      <StyledTimelineContainer />
      {selectedFundsFlow.length === 0 ? (
        // display FundsFlowSelector component when funds flow has not been selected
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
      ) : (
        // TODO: display code blocks when funds flow is selected
        <div>Funds flow is selected: {selectedFundsFlow}</div>
      )}

      <StyledBottomContainer>
        {
          // display 'Start' button initiatlly;
          // replace with 'Next', 'Back' once funds flow is selected
          selectedFundsFlow.length === 0 ? (
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
            <>
              <Button text="Back" size="standard" variant="hollow-light" />

              <Button text="Next" size="standard" variant="primary" />
            </>
          )
        }
      </StyledBottomContainer>
    </StyledContainer>
  );
}

export default TransferWorkflow;

import React, { useState } from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Select from "../../app/components/base/select/Select";
import { PURPLE_DARKER } from "../../app/components/colors";

const SelectWrapContainer = styled.div`
  width: 150px;
`;

const PurpleBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PURPLE_DARKER};
`;

function SelectWrap({
  autoWidth = false,
  variant = "default",
}: {
  autoWidth?: boolean;
  variant?: "default" | "code";
}) {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "python", label: "Python" },
    { value: "raw", label: "Raw" },
  ];
  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <SelectWrapContainer>
      <Select
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        autoWidth={autoWidth}
        variant={variant}
      />
    </SelectWrapContainer>
  );
}

storiesOf("base|Select", module)
  .addDecorator(centered)
  .add("autoWidth", () => <SelectWrap autoWidth />)
  .add("inheritWidth", () => <SelectWrap />)
  .add("codeBlockVariant - autoWidth", () => (
    <PurpleBackground>
      <SelectWrap variant="code" autoWidth />
    </PurpleBackground>
  ))
  .add("codeBlockVariant - inheritWidth", () => (
    <PurpleBackground>
      <SelectWrap variant="code" />
    </PurpleBackground>
  ));

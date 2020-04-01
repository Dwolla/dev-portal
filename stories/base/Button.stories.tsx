import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Button from "../../components/base/Button";

storiesOf("base|Button", module)
  .addDecorator(centered)
  .addParameters({ backgrounds: [{ name: "dark", value: "#2d2d47" }] })
  .add("Primary Tiny", () => (
    <Button text="Button" size="tiny" variant="primary" />
  ))
  .add("Primary Small", () => (
    <Button text="Button" size="small" variant="primary" />
  ))
  .add("Primary Standard", () => (
    <Button text="Button" size="standard" variant="primary" />
  ))
  .add("Primary Large", () => (
    <Button text="Button" size="large" variant="primary" />
  ))
  .add("Secondary Standard", () => (
    <Button text="Button" size="standard" variant="secondary" />
  ))
  .add("Hollow-light Standard", () => (
    <Button text="Button" size="standard" variant="hollow-light" />
  ))
  .add("Hollow-dark Standard", () => (
    <Button text="Button" size="standard" variant="hollow-dark" />
  ));

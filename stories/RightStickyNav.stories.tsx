import React from "react";
import RightStickyNav from "../components/RightStickyNav";

// const myArray = [
//   {
//     key: 1,
//     level: 1,
//     text: "The Basics",
//   },
//   {
//     key: 2,
//     level: 2,
//     text: "Verification statuses and corresponding events",
//   },
//   {
//     key: 3,
//     level: 3,
//     text: "Handling retry status",
//   },
//   {
//     key: 4,
//     level: 3,
//     text: "Handling status: suspended",
//   },
//   {
//     key: 5,
//     level: 4,
//     text: "Determining verification documents needed",
//   },
//   {
//     key: 6,
//     level: 2,
//     text: "Level 2 Heading",
//   },
//   {
//     key: 7,
//     level: 3,
//     text: "Handling retry status",
//   },
// ];

export default {
  title: "Right Sticky Nav",
  component: RightStickyNav,
};

// export const Default = () => (
//   <RightStickyNav
//     headers={[
//       {
//         key: 1,
//         level: 1,
//         text: "The Basics",
//       },
//       {
//         key: 2,
//         level: 2,
//         text: "Verification statuses and corresponding events",
//       },
//       {
//         key: 3,
//         level: 3,
//         text: "Handling retry status",
//       },
//       {
//         key: 4,
//         level: 3,
//         text: "Handling status: suspended",
//       },
//       {
//         key: 5,
//         level: 4,
//         text: "Determining verification documents needed",
//       },
//       {
//         key: 6,
//         level: 2,
//         text: "Level 2 Heading",
//       },
//       {
//         key: 7,
//         level: 3,
//         text: "Handling retry status",
//       },
//     ]}
//   />
// );

export const Default = () => (
  <RightStickyNav
    headers={[
      {
        key: "1",
        level: "1",
        text: "The Basics",
      },
      {
        key: "2",
        level: "2",
        text: "Verification statuses and corresponding events",
      },
      {
        key: "3",
        level: "3",
        text: "Handling retry status",
      },
      {
        key: "4",
        level: "3",
        text: "Handling status: suspended",
      },
      {
        key: "5",
        level: "4",
        text: "Determining verification documents needed",
      },
      {
        key: "6",
        level: "2",
        text: "Level 2 Heading",
      },
      {
        key: "7",
        level: "3",
        text: "Handling retry status",
      },
    ]}
  />
);

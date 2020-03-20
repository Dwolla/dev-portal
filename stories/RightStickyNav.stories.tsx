import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "@emotion/styled";
import RightStickyNav from "../components/base/RightStickyNav";

// Headings array to pass as props to RightStickyNav
const headingsArray = [
  {
    key: "1",
    level: "1",
    title: "The Basics",
    paragraph:
      "Paragraph 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet. Sed lectus vestibulum mattis ullamcorper velit sed. Nec nam aliquam sem et tortor. Elit eget gravida cum sociis natoque. Ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac feugiat sed. Turpis egestas maecenas pharetra convallis posuere morbi leo. Duis at consectetur lorem donec massa sapien faucibus et molestie. Purus sit amet luctus venenatis lectus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sapien et ligula ullamcorper malesuada. Fringilla ut morbi tincidunt augue interdum velit euismod. Vitae turpis massa sed elementum tempus egestas sed. Netus et malesuada fames ac turpis egestas integer eget aliquet. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nisi est sit amet facilisis. Vitae congue eu consequat ac felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nisl condimentum id venenatis a condimentum. Rutrum tellus pellentesque eu tincidunt tortor. Semper auctor neque vitae tempus quam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Enim lobortis scelerisque fermentum dui faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi. Iaculis eu non diam phasellus vestibulum lorem. Et odio pellentesque diam volutpat commodo. Sodales ut etiam sit amet nisl purus in. Adipiscing elit ut aliquam purus sit. Bibendum enim facilisis gravida neque convallis a cras. Duis at consectetur lorem donec massa sapien faucibus et molestie. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Non odio euismod lacinia at quis risus sed vulputate odio. Vel turpis nunc eget lorem dolor sed viverra ipsum. A lacus vestibulum sed arcu. Odio aenean sed adipiscing diam. Volutpat ac tincidunt vitae semper quis lectus. Tristique magna sit amet purus. Euismod in pellentesque massa placerat duis. Tellus molestie nunc non blandit massa enim nec dui nunc. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Ac felis donec et odio pellentesque diam volutpat commodo sed. Orci sagittis eu volutpat odio. Purus faucibus ornare suspendisse sed nisi lacus. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Habitant morbi tristique senectus et netus et. Porta non pulvinar neque laoreet suspendisse. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tellus integer feugiat scelerisque varius. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Pharetra et ultrices neque ornare aenean euismod. Proin sagittis nisl rhoncus mattis rhoncus. Nisi quis eleifend quam adipiscing vitae. Eget mauris pharetra et ultrices neque ornare aenean euismod elementum. Non arcu risus quis varius quam quisque id diam. Pharetra magna ac placerat vestibulum. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Sed id semper risus in hendrerit gravida. Ultrices eros in cursus turpis massa. Non tellus orci ac auctor augue mauris augue. Arcu vitae elementum curabitur vitae nunc. Convallis a cras semper auctor neque vitae tempus quam. Varius quam quisque id diam vel.",
  },
  {
    key: "2",
    level: "2",
    title: "Verification statuses and corresponding events",
    paragraph:
      "Paragraph 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet. Sed lectus vestibulum mattis ullamcorper velit sed. Nec nam aliquam sem et tortor. Elit eget gravida cum sociis natoque. Ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac feugiat sed. Turpis egestas maecenas pharetra convallis posuere morbi leo. Duis at consectetur lorem donec massa sapien faucibus et molestie. Purus sit amet luctus venenatis lectus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sapien et ligula ullamcorper malesuada. Fringilla ut morbi tincidunt augue interdum velit euismod. Vitae turpis massa sed elementum tempus egestas sed. Netus et malesuada fames ac turpis egestas integer eget aliquet. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nisi est sit amet facilisis. Vitae congue eu consequat ac felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nisl condimentum id venenatis a condimentum. Rutrum tellus pellentesque eu tincidunt tortor. Semper auctor neque vitae tempus quam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Enim lobortis scelerisque fermentum dui faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi. Iaculis eu non diam phasellus vestibulum lorem. Et odio pellentesque diam volutpat commodo. Sodales ut etiam sit amet nisl purus in. Adipiscing elit ut aliquam purus sit. Bibendum enim facilisis gravida neque convallis a cras. Duis at consectetur lorem donec massa sapien faucibus et molestie. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Non odio euismod lacinia at quis risus sed vulputate odio. Vel turpis nunc eget lorem dolor sed viverra ipsum. A lacus vestibulum sed arcu. Odio aenean sed adipiscing diam. Volutpat ac tincidunt vitae semper quis lectus. Tristique magna sit amet purus. Euismod in pellentesque massa placerat duis. Tellus molestie nunc non blandit massa enim nec dui nunc. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Ac felis donec et odio pellentesque diam volutpat commodo sed. Orci sagittis eu volutpat odio. Purus faucibus ornare suspendisse sed nisi lacus. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Habitant morbi tristique senectus et netus et. Porta non pulvinar neque laoreet suspendisse. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Tellus integer feugiat scelerisque varius. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Pharetra et ultrices neque ornare aenean euismod. Proin sagittis nisl rhoncus mattis rhoncus. Nisi quis eleifend quam adipiscing vitae. Eget mauris pharetra et ultrices neque ornare aenean euismod elementum. Non arcu risus quis varius quam quisque id diam. Pharetra magna ac placerat vestibulum. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Sed id semper risus in hendrerit gravida. Ultrices eros in cursus turpis massa. Non tellus orci ac auctor augue mauris augue. Arcu vitae elementum curabitur vitae nunc. Convallis a cras semper auctor neque vitae tempus quam. Varius quam quisque id diam vel.",
  },
  {
    key: "3",
    level: "3",
    title: "Handling retry status",
    paragraph:
      "Paragraph 3. Paragraph 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet. Sed lectus vestibulum mattis ullamcorper velit sed. Nec nam aliquam sem et tortor. Elit eget gravida cum sociis natoque. Ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac feugiat sed. Turpis egestas maecenas pharetra convallis posuere morbi leo. Duis at consectetur lorem donec massa sapien faucibus et molestie. Purus sit amet luctus venenatis lectus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sapien et ligula ullamcorper malesuada. Fringilla ut morbi tincidunt augue interdum velit euismod. Vitae turpis massa sed elementum tempus egestas sed. Netus et malesuada fames ac turpis egestas integer eget aliquet. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nisi est sit amet facilisis. Vitae congue eu consequat ac felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nisl condimentum id venenatis a condimentum. Rutrum tellus pellentesque eu tincidunt tortor. Semper auctor neque vitae tempus quam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Enim lobortis scelerisque fermentum dui faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi. Iaculis eu non diam phasellus vestibulum lorem. ",
  },
  {
    key: "4",
    level: "3",
    title: "Handling status: suspended",
    paragraph:
      "Paragraph 4. Paragraph 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet. Sed lectus vestibulum mattis ullamcorper velit sed. Nec nam aliquam sem et tortor. Elit eget gravida cum sociis natoque. Ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac feugiat sed. Turpis egestas maecenas pharetra convallis posuere morbi leo. Duis at consectetur lorem donec massa sapien faucibus et molestie. Purus sit amet luctus venenatis lectus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sapien et ligula ullamcorper malesuada. Fringilla ut morbi tincidunt augue interdum velit euismod. Vitae turpis massa sed elementum tempus egestas sed. Netus et malesuada fames ac turpis egestas integer eget aliquet. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nisi est sit amet facilisis. Vitae congue eu consequat ac felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nisl condimentum id venenatis a condimentum. Rutrum tellus pellentesque eu tincidunt tortor. Semper auctor neque vitae tempus quam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Enim lobortis scelerisque fermentum dui faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi. Iaculis eu non diam phasellus vestibulum lorem. ",
  },
  {
    key: "5",
    level: "4",
    title: "Determining verification documents needed",
    paragraph: "Paragraph 5. ellus vestibulum lorem. ",
  },
  {
    key: "6",
    level: "2",
    title: "Level 2 Heading",
    paragraph:
      "Paragraph 6. Paragraph 1. Lorem ipsum dolor sicididun diam phasellus vestibulum lorem. ",
  },
  {
    key: "7",
    level: "3",
    title: "Handling retry status",
    paragraph:
      "Paragraph  7. Paragraph 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet. Sed lectus vestibulum mattis ullamcorper velit sed. Nec nam aliquam sem et tortor. Elit eget gravida cum sociis natoque. Ipsum a arcu cursus vitae. Massa sapien faucibus et molestie ac feugiat sed. Turpis egestas maecenas pharetra convallis posuere morbi leo. Duis at consectetur lorem donec massa sapien faucibus et molestie. Purus sit amet luctus venenatis lectus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Sapien et ligula ullamcorper malesuada. Fringilla ut morbi tincidunt augue interdum velit euismod. Vitae turpis massa sed elementum tempus egestas sed. Netus et malesuada fames ac turpis egestas integer eget aliquet. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nisi est sit amet facilisis. Vitae congue eu consequat ac felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Nisl condimentum id venenatis a condimentum. Rutrum tellus pellentesque eu tincidunt tortor. Semper auctor neque vitae tempus quam. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Enim lobortis scelerisque fermentum dui faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi. Iaculis eu non diam phasellus vestibulum lorem. ",
  },
];

// Styled components
const SectionStyle = styled.div`
  display: flex;
`;

const StickyNav = styled.div`
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 40px;
  font-family: "Poppins", sans-serif;
  h1 {
    height: 43px;
    color: #2a2d38;
    font-size: 30px;
    letter-spacing: 0;
    line-height: 46px;
  }
  p {
    color: #6a7282;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 28px;
  }
`;
const Footer = styled.div`
  height: 448px;
`;

// Right Sticky Nav without content (nav item doesn't highlight without content)
storiesOf("Right Sticky Nav", module).add("Default", () => (
  <RightStickyNav headings={headingsArray} />
));

// Right Sticky Nav with content
storiesOf("Right Sticky Nav", module).add("With content", () => (
  <div>
    <SectionStyle>
      <div>
        {headingsArray.map((item) => (
          <Content id={item.key}>
            <h1>{item.title}</h1>
            <p>{item.paragraph}</p>
          </Content>
        ))}
      </div>
      <StickyNav>
        <RightStickyNav headings={headingsArray} />
      </StickyNav>
    </SectionStyle>
    <Footer />
  </div>
));

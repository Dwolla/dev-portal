import { buildContentModule } from "../content";

const TestContent = buildContentModule(`${__dirname}/fake-content/`);
const TestContent2 = buildContentModule(`${__dirname}/fake-content`);
const TestContent3 = buildContentModule(
  `${__dirname}/fake-content/api-reference`
);

test("list", async () => {
  const content = await TestContent.list();
  expect(content).toMatchSnapshot();
});

test("list (2)", async () => {
  const content = await TestContent2.list();
  expect(content).toMatchSnapshot();
});

test("getApiReference", async () => {
  const content = await TestContent3.getApiReference();
  expect(content).toMatchSnapshot();
});

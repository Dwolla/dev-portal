# dev-portal

## Getting Started

If you choose to get started without Docker, ensure that you are building `dev-portal` with Node v16. Otherwise, to use Docker, 
refer to the following section, [Using Docker](#using-docker).

```bash
yarn install
yarn dev
open http://localhost:3000
open dev-portal.code-workspace
```

## Using Docker

Ensure [Docker](https://docs.docker.com/get-docker/) is installed on your machine before following these steps. To use Docker with 
this repository, you can either use Docker's CLI or Docker Compose, both of which are defined in more detail below:

### Docker CLI

```bash
# Build Docker Container
$ docker build -t dwolla/dev-portal:0.1.0 .

# Start Docker Container
$ docker run [-d] -p 3000:3000 \
  -v "$(pwd)"/:/app \
  -v /app/.mdx-data \
  -v /app/.next \
  -v /app/node_modules \
  dwolla/dev-portal:0.1.0
```

### Docker Compose

```bash
# Build Docker Container
$ docker-compose build

# Start Docker Container
$ docker-compose up [-d]

# Destroy Docker Container
$ docker-compose down
```

## Commands

- `yarn install` - Install dependencies
- `yarn dev` - Start development server
- `yarn test{,:ci,:coverage}` - Run tests
- `yarn checks` - Run Prettier, TypeScript, ESLint checks
- `yarn fix` - Attempt to fix Prettier, TypeScript, ESLint errors
- `yarn build` - Build for production
- `yarn build-storybook` - Build Storybook
- `yarn start` - Start production server
- `yarn storybook` - Start Storybook

## Pages

The framework powering `dev-portal`, [Next.js][nextjs], centers around [pages][nextjs-pages].

> In Next.js, a **page** is a [React Component][react-component] exported from a `.js`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file name.
>
> **Example**: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.

In addition, `dev-portal` supports [`.mdx`][mdx] pages which:

- are Markdown files
- define metadata as YAML frontmatter
- can embed React components

For example:

```markdown
---
category: "" # Which category doc is displayed under in sidebar
title: "" # Doc title when linked to

# Defining a `group` on `index.mdx` groups docs in same folder
group:
  category: "" # Overrides individual doc categories
  title: "" # Group title that can be expanded in sidebar
---

Page content

<MyComponent />
```

#### Sections

Categories can be ordered in the side nav by creating a `_section.yml` file in a section's root directory (e.g. `pages/guides/_section.yml`).

```yaml
categories:
  - "Getting Started"
  - "Customers"
  - "Funding Sources"
  - "Webhooks"
```

![doc concepts](/doc-concepts.png)

[mdx]: https://mdxjs.com
[nextjs]: https://nextjs.org
[nextjs-pages]: https://nextjs.org/docs/basic-features/pages
[react-component]: https://reactjs.org/docs/components-and-props.html

## Components

In addition to pages, the following can be found in `/components`:

- `layout` components
  - render the layout _surrounding_ a page
- `partial` components
  - render parts _within_ a page
- `atom` components
  - building blocks extracted from `layout` and `partial` components
- `util` components
  - don't contain markup or styles

### Where to put components?

Components are organized based on their relationship to pages.

As a rule of thumb, start with a `layout` or `partial` component. Which one depends on _where the component is rendered relative to a page_:

- `layout` components are rendered _outside_ the page
- `partial` components are rendered _within_ the page

![component types](/component-types.jpg)

### What about `atom` and `util` components?

`atom` components can be extracted from `layout` and `partial` components when an abstraction becomes apparent. In general, it's a good idea to wait until you have some concrete use cases for an abstraction before creating one.

- https://terodox.tech/one-two-n-pattern/
- https://overreacted.io/goodbye-clean-code/
- https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction

`util` components are different than other types of components in that they don't contain markup or styles. `util` components are good candidates for breaking out into their own library/package at some point.

## Conventions

#### Naming Styled Components

Prefix styled components with `Styled*`, for example:

```tsx
const StyledContainer = styled.div`
  padding: 10px;
`;

const MyComponent = () => <StyledContainer>MyComponent</StyledContainer>;
```

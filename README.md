# dev-portal

## Getting Started

```bash
yarn install
yarn dev
open http://localhost:3000
open dev-portal.code-workspace
```

## Commands

- `yarn install` - Install dependencies
- `yarn dev` - Start development server
- `yarn test` `yarn test:ci` `yarn test:coverage` - Run tests
- `yarn checks` - Run Prettier, TypeScript checks
- `yarn fix` - Attempt to fix Prettier, TypeScript errors
- `yarn build` - Build and export for production
- `yarn start` - Start production server
- `yarn storybook` - Start Storybook

## Docs

Docs are located in the `pages/docs/` folder. At the moment, the following
metadata can be defined as YAML frontmatter:

```yaml
category: "" # Which category doc is displayed under in sidebar
title: "" # Doc title when linked to

# (optional for index.mdx files)
# Groups docs in same folder as index.mdx in the sidebar
group:
  category: "" # Overrides individual doc categories
  title: "" # Group title that can be expanded in sidebar
```

# API Reference Content

Files in `/content/api-reference` are used to describe "APIs" and "Methods" provided by the various Dwolla SDKs.

An API can be defined by creating a MDX file at `/content/api-reference/$api_name.mdx` which may contain the following frontMatter parameters:

```yaml
name: get
http:
  url: /customers/:id
  method: get
  params:
    limit: Limit
```

```yaml
name: post
http:
  url: /customers
  method: get
  params:
    firstName: String
```

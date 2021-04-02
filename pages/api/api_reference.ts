import Content from "../../app/modules/content";

// const stripRawBody = ({ rawBody, ...rest }) => rest;

export default async function (req, res) {
  const apiRef = await Content.getApiReference();
  res.status(200).json({
    data: apiRef,
  });
}

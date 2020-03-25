import { useAnchors } from "../util/Anchors";

export default function OnThisPage() {
  const { anchors } = useAnchors();

  return <pre>{JSON.stringify(anchors, null, 2)}</pre>;
}

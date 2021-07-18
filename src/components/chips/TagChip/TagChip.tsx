import { Chip } from "@material-ui/core";
import { useEffect, useState } from "react";
import fetchGodTag from "../../../lib/fetchGodTag";
import { GodTag } from "../../../types/GodTag";
import { Tag } from "../../../types/Tag";

interface Props {
  tag?: Tag;
  tagId?: string;
}

export default function TagChip(props: Props): JSX.Element | null {
  const [tag, setTag] = useState<GodTag | null>(null);

  useEffect(() => {
    async function fetchGodTagByIdAsync() {
      const response = await fetchGodTag(props.tag!.id);
      setTag(response);
    }

    async function fetchGodTagByNameAsync() {
      const response = await fetchGodTag(props.tagId!);
      setTag(response);
    }

    if (props.tag?.id) fetchGodTagByIdAsync();
    else if (props.tagId) fetchGodTagByNameAsync();
  }, [props.tag?.id, props.tagId]);

  if (!tag) return null;

  return <Chip label={tag.tag} />;
}

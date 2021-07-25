import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Popover } from "@material-ui/core";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import createActionReaction from "../../../lib/createActionReaction";
import { addActionReaction } from "../../../store/actionReactions";

interface Props {
  size: SizeProp;
  actionId: string;
  userId: string;
}

export default function EmojiPopover(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [shouldShow, setShouldShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!shouldShow) {
      setAnchorEl(event.currentTarget);
      setShouldShow(true);
    } else {
      setShouldShow(false);
      setAnchorEl(null);
    }
  };

  const onClose = () => {
    setAnchorEl(null);
    setShouldShow(false);
  };

  const onPick = (emoji: BaseEmoji) => {
    async function createActionReactionAsync() {
      const godActionReaction = await createActionReaction(props.actionId, emoji, props.userId);
      dispatch(addActionReaction({ actionId: props.actionId, reaction: godActionReaction.reaction }));
    }

    if (emoji && props.actionId && props.userId) createActionReactionAsync();
  };

  return (
    <div>
      <Button onClick={onClick}>
        <FontAwesomeIcon icon={faSmileBeam} size={props.size} />
      </Button>

      <Popover
        open={shouldShow}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Picker showPreview={false} showSkinTones={false} onClick={onPick} color="primary" />
      </Popover>
    </div>
  );
}

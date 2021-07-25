import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { hideView, showView } from "../../../store/views";
import { EmojiPopover } from "../../../util/views";

interface Props {
  size: SizeProp;
}

export default function ReactionButton(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const shouldShowEmojiPopover = useSelector((state: RootState) => state.views.EmojiPopover);

  const onClick = () => {
    if (shouldShowEmojiPopover) dispatch(hideView(EmojiPopover));
    else dispatch(showView(EmojiPopover));
  };

  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={faSmileBeam} size={props.size} />
    </Button>
  );
}

import { useTheme } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  color?: string;
  size?: number;
  isLoading: boolean;
}

export default function DropboxReadsClipLoader(props: Props): JSX.Element {
  const theme = useTheme();

  const color = props.color ?? theme.palette.primary.main;

  const size = props.size ?? 24;

  return <ClipLoader color={color} loading={props.isLoading} size={size} />;
}

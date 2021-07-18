import { useTheme } from "@material-ui/core";
import GridLoader from "react-spinners/GridLoader";

interface Props {
  color?: string;
  size?: number;
  isLoading: boolean;
}

export default function DropboxReadsSpinner(props: Props): JSX.Element {
  const theme = useTheme();

  const color = props.color ?? theme.palette.primary.main;

  const size = props.size ?? 24;

  return <GridLoader color={color} loading={props.isLoading} size={size} />;
}

import { ComponentName } from "./ComponentName";
import { GridDirection } from "./GridDirection";
import { LayoutName } from "./LayoutName";

export default interface Route {
  path: string;
  componentName: ComponentName;
  layoutName: LayoutName;
  direction: GridDirection;
  isOutlet?: boolean;
  children?: Route[];
}

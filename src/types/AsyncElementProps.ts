import { ComponentName } from "./ComponentName";
import { GridDirection } from "./GridDirection";
import { LayoutName } from "./LayoutName";

export default interface AsyncElementProps {
  componentName: ComponentName;
  layoutName: LayoutName;
  direction: GridDirection;
}

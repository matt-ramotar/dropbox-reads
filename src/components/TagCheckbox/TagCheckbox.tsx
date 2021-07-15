import { Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from '../../store/filters';
import { Tag } from "../../types/Tag";
import styles from "./TagCheckbox.module.scss";

interface Props {
  tag: Tag;
}

export default function TagCheckbox(props: Props): JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChecked) dispatch(addFilter(event.target.name.toLowerCase()))
    else dispatch(removeFilter(event.target.name.toLowerCase()))
    setIsChecked(!isChecked)
  };

  return (
    <Grid className={styles.root}>
      <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} name={props.tag.id} color="primary"/>}
            label={<Typography variant="caption" className={styles.label}>{props.tag.tag}</Typography>}
          />
    </Grid>
  );
}

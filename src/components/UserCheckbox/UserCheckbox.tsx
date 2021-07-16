import { Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserFilter, removeUserFilter } from '../../store/userFilters';
import SafeUser from "../../types/SafeUser";
import styles from "./UserCheckbox.module.scss";

interface Props {
  user: SafeUser;
}

export default function UserCheckbox(props: Props): JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChecked) dispatch(addUserFilter(event.target.name))
    else dispatch(removeUserFilter(event.target.name))
    setIsChecked(!isChecked)
  };

  return (
    <Grid className={styles.root}>
      <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} name={props.user.id} color="primary"/>}
            label={<Typography variant="caption" className={styles.label}>{`${props.user.firstName} ${props.user.lastName}`}</Typography>}
          />
    </Grid>
  );
}

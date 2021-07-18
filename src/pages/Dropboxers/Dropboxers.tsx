import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import DropboxerCard from "../../components/cards/DropboxerCard";
import fetchUsers from "../../lib/fetchUsers";
import { GodUser } from "../../types/GodUser";
import SafeUser from "../../types/SafeUser";
import styles from "./dropboxers.module.scss";

interface Props {
  user: SafeUser;
}

export default function DropboxersPage(props: Props): JSX.Element | null {
  const [dropboxers, setDropboxers] = useState<null | GodUser[]>(null);

  useEffect(() => {
    async function fetchUsersAsync() {
      const response = await fetchUsers();
      setDropboxers(response);
    }

    fetchUsersAsync();
  }, [setDropboxers]);

  if (!dropboxers) return null;

  return (
    <Grid>
      <Box className={styles.dropboxers}>
        {dropboxers.map((dropboxer) => (
          <DropboxerCard key={dropboxer.id} user={dropboxer} />
        ))}
      </Box>
    </Grid>
  );
}

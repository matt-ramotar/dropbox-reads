import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import DropboxerCard from "../../components/cards/DropboxerCard";
import DropboxReadsSpinner from "../../components/spinners/DropboxReadsSpinner";
import fetchUsers from "../../lib/fetchUsers";
import { GodUser } from "../../types/GodUser";
import SafeUser from "../../types/SafeUser";
import styles from "./dropboxers.module.scss";

interface Props {
  user: SafeUser;
}

export default function DropboxersPage(props: Props): JSX.Element | null {
  const [dropboxers, setDropboxers] = useState<null | GodUser[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsersAsync() {
      const response = await fetchUsers();
      setDropboxers(response);
      setIsLoading(false);
    }

    fetchUsersAsync();
  }, [setDropboxers]);

  if (!dropboxers || isLoading)
    return (
      <Box className={styles.loader}>
        <DropboxReadsSpinner isLoading={isLoading} />
      </Box>
    );

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

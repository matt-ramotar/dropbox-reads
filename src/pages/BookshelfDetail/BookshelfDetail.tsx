import { Box, Chip, Typography } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchGodBookshelf from "../../lib/fetchGodBookshelf";
import { GodBookshelf } from "../../types/GodBookshelf";
import SafeUser from "../../types/SafeUser";

export const BookshelfDetail: FC<{ user: SafeUser }> = (props) => {
  const { bookshelfId } = useParams();

  const [godBookshelf, setGodBookshelf] = useState<GodBookshelf | null>(null);

  useEffect(() => {
    async function fetchGodBookshelfAsync() {
      const response = await fetchGodBookshelf(bookshelfId);
      setGodBookshelf(response);
    }

    fetchGodBookshelfAsync();
  }, [setGodBookshelf, bookshelfId]);

  if (!godBookshelf) return null;

  return (
    <Box>
      <Typography variant="h2">Bookshelf</Typography>
      <Typography>{godBookshelf.name}</Typography>
      {godBookshelf.tags?.map((tag) => (
        <Chip key={tag.id} label={tag.tag} />
      ))}

      <Typography>Owner</Typography>
      <Typography>{godBookshelf.user.username}</Typography>
      <img src={godBookshelf.user.picture ?? ""} alt={godBookshelf.user.username} />
    </Box>
  );
};

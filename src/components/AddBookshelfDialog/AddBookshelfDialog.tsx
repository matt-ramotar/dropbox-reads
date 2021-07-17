import { Chip, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import createBookshelf from "../../lib/createBookshelf";
import { RootState } from "../../store";
import { hideView } from "../../store/views";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import { AddBookshelfDialog as AddBookshelfDialogId } from "../../util/views";

interface Props {
  user: SafeUser;
  tags: Tag[];
}

export default function AddBookshelfDialog(props: Props): JSX.Element | null {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);

  const views = useSelector((state: RootState) => state.views);

  const isOpen = views[AddBookshelfDialogId] ?? false;

  const handleClose = () => {
    dispatch(hideView(AddBookshelfDialogId));
  };

  const handleSubmit = () => {
    if (name && description && tags) createBookshelfAsync();

    async function createBookshelfAsync() {
      try {
        const response = await createBookshelf(props.user.id, name!, description!, tags!);
        if (response) {
          navigate(`/i/bookshelves/${response.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddTag = (e: any, id: string) => {
    let nextTags = tags;
    if (nextTags) nextTags.push(id);
    else nextTags = [id];
    setTags(nextTags);
  };

  if (!isOpen) return null;

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
      <Grid item xs={3}>
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a Bookshelf</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              rows={3}
            />

            {props.tags.map((tag) => (
              <Chip label={tag.tag} key={tag.id} onClick={(e) => handleAddTag(e, tag.id)} />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

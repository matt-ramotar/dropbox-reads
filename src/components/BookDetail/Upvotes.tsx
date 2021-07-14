import React, {useState} from 'react';
import filledUpvote from "../../images/filledUpvote.png";
import unfilledUpvote from "../../images/unfilledUpvote.png";
import styles from "./BookDetail.module.scss";
import {BookUpvote} from "../../types/BookUpvote";


interface UpvoteProps {
  bookUpvotes: BookUpvote[];
}

export const Upvotes: React.FC<UpvoteProps> = ({bookUpvotes}) => {
  const [upvoteCount, setUpvoteCount] = useState<number>(bookUpvotes.length);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  // TODO: check if user upvoted instead of hardcoding it's initial state
  // TODO: only allow upvoting if logged in
  // TODO: persist the upvote, submit with reaction id

  const onClick = () => {
    if (isUpvoted) {
      setUpvoteCount(upvoteCount - 1);
      setIsUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setIsUpvoted(true);
    }
  };

  return (
    <div className={styles.upvotes}>
      <button
        className={styles.btn}
        style={{
          backgroundImage: isUpvoted ? `url(${filledUpvote})` : `url(${unfilledUpvote})`,
        }}
        onClick={onClick}
      />{upvoteCount}
    </div>
  );
}

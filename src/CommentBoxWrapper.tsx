import React, { FC, useState } from 'react';
import { CommentBox } from './comment-widget/CommentBox';
import { User } from './data';

interface CommentBoxWrapperProps {
  loadUsers: () => Promise<User[]>;
}

export const CommentBoxWrapper: FC<CommentBoxWrapperProps> = ({ loadUsers }) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  return (
    <CommentBox value={textAreaValue} onChange={setTextAreaValue} loadUsers={loadUsers} />
  );
};

import React, { FC, useState } from 'react';
import { TextArea } from './comment-widget/TextArea';
import { User } from './data';

interface TextAreaWrapperProps {
  loadUsers: () => Promise<User[]>;
}

export const TextAreaWrapper: FC<TextAreaWrapperProps> = ({ loadUsers }) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  return (
    <TextArea value={textAreaValue} onChange={setTextAreaValue} loadUsers={loadUsers} />
  );
};

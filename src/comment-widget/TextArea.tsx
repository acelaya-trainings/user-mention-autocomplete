import { FC, useEffect, useState } from 'react';
import { User } from '../data';
import { UsersDropdown } from './UsersDropdown';
import './TextArea.css';

interface TextAreaProps {
  loadUsers: () => Promise<User[]>
}

export const TextArea: FC<TextAreaProps> = ({ loadUsers }) => {
  const [filteringText, setFilteringText] = useState<string>('')
  const [inMentioningMode, setInMentioningMode] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>()

  useEffect(() => {
    loadUsers().then(setUsers);
  }, [loadUsers]);

  return (
    <div className="comment-widget-mention-text-area">
      <label htmlFor="commentContainer">Write a comment:</label>
      <textarea
        id="commentContainer"
        placeholder="Write a comment..."
        className="comment-widget-mention-text-area__content"
        onKeyDown={(e) => {
          const currentlyTypedChar = e.nativeEvent.key;

          if (inMentioningMode) {
            if (currentlyTypedChar === 'Backspace') {
              if (filteringText.trim() === '') {
                setInMentioningMode(false);
              } else {
                setFilteringText(`${filteringText}`.slice(0, -1));
              }
            } else {
              setFilteringText(`${filteringText}${currentlyTypedChar}`.toLowerCase());
            }
          } else {
            setInMentioningMode(currentlyTypedChar === '@')
          }
        }}
        // onChange={(e) => {
        // }}
      />
      {filteringText.trim() !== '' && (
        <div className="comment-widget-mention-text-area__list">
          {users === undefined && 'Loading users...'}
          {users && <UsersDropdown users={users} filteringText={filteringText} />}
        </div>
      )}
    </div>
  );
};

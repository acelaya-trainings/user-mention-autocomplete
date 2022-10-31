import { FC, useEffect, useRef, useState } from 'react';
import { User } from '../data';
import { UsersDropdown } from './UsersDropdown';
import './CommentBox.css';

interface CommentBoxProps {
  loadUsers: () => Promise<User[]>;
  value: string;
  onChange: (comment: string) => void;
}

export const CommentBox: FC<CommentBoxProps> = ({ loadUsers, value, onChange }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [filteringText, setFilteringText] = useState<string>('')
  const [inMentioningMode, setInMentioningMode] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>()
  const selectUser = (user: User) => {
    setInMentioningMode(false);
    setFilteringText('');
    onChange(value.replace(`@${filteringText}`, `@${user.name}`));
    textAreaRef.current?.focus();
  };

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
        ref={(element) => {
          textAreaRef.current = element ?? undefined;
        }}
        value={value}
        onKeyDown={({ nativeEvent }) => {
          const { key: currentlyTypedChar } = nativeEvent;

          if (inMentioningMode) {
            const backspaceTyped = currentlyTypedChar === 'Backspace';

            // Disable mentioning mode once all text is removed
            setInMentioningMode(!backspaceTyped || filteringText !== '');
            setFilteringText(backspaceTyped ? `${filteringText}`.slice(0, -1) : `${filteringText}${currentlyTypedChar}`.toLowerCase());
          } else {
            setInMentioningMode(currentlyTypedChar === '@')
          }
        }}
        onChange={({ target }) => onChange(target.value)}
      />
      {filteringText !== '' && (
        <div className="comment-widget-mention-text-area__list">
          {users === undefined && 'Loading users...'}
          {users && <UsersDropdown users={users} selectUser={selectUser} filteringText={filteringText} />}
        </div>
      )}
    </div>
  );
};

import { FC, useEffect, useState } from 'react';
import { User } from '../data';
import './MentionTextArea.css';
import { UsersDropdown } from './UsersDropdown';

interface MentionTextAreaProps {
  loadDataSet: () => Promise<User[]>
}

export const MentionTextArea: FC<MentionTextAreaProps> = ({ loadDataSet }) => {
  const [filteringText, setFilteringText] = useState<string>('')
  const [inMentioningMode, setInMentioningMode] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>()

  useEffect(() => {
    loadDataSet().then(setUsers);
  }, []);
  useEffect(() => {
    console.log(filteringText);
  }, [filteringText])

  return (
    <div className="mention-text-area">
      <textarea
        className="mention-text-area__content"
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
      {filteringText !== '' && (
        <div className="mention-text-area__list">
          {!users && 'Loading users...'}
          {users && <UsersDropdown users={users} filteringText={filteringText} />}
        </div>
      )}
    </div>
  );
};

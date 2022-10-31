import { FC, ReactNode, useEffect, useState } from 'react';
import './MentionTextArea.css';

interface User {
  username: string;
  avatar_url: string;
  name: string;
}

interface MentionTextAreaProps {
  loadDataSet: () => Promise<User[]>
}

const highlightText = (text: string, filteringText: string): ReactNode[] =>
  text.split(filteringText).map((part, index, array) => array.length === index + 1 ? part : <>{part} <span className="mention-text-area__list-item--highlight">{filteringText}</span></>)

export const MentionTextArea: FC<MentionTextAreaProps> = ({ loadDataSet }) => {
  const [lastTypedChar, setLastTypedChar] = useState<string | null | undefined>();
  const [filteringText, setFilteringText] = useState<string>('')
  const [users, setUsers] = useState<User[] | undefined>()

  useEffect(() => {
    loadDataSet().then(setUsers);
  }, []);

  return (
    <div className="mention-text-area">
      <div
        className="mention-text-area__content"
        contentEditable
        onInput={({ nativeEvent }) => {
          console.log(nativeEvent);
          const currentlyTypedChar = (nativeEvent as any).data;

          if (lastTypedChar === '@') {
            setFilteringText(`${filteringText}${currentlyTypedChar}`.toLowerCase());
            console.log('Writing after @');
          } else {
            setLastTypedChar(currentlyTypedChar)
          }
        }}
      />
      {filteringText !== '' && (
        <div className="mention-text-area__list">
          {!users && 'Loading users...'}
          {users && [
            ...users.filter(({ name, username }) => name.toLowerCase().startsWith(filteringText) || username.toLowerCase().startsWith(filteringText)),
            ...users.filter(({ name, username }) => (!name.toLowerCase().startsWith(filteringText) && name.toLowerCase().includes(filteringText)) || (!username.toLowerCase().startsWith(filteringText)) && username.toLowerCase().includes(filteringText)),
          ].slice(0, 10).map((user => (
            <div key={user.username} className="mention-text-area__list-item">
              <img src={user.avatar_url} alt={`Avatar image for ${user.name}`} className="mention-text-area__list-avatar-img" />
              {highlightText(user.name, filteringText)} ({highlightText(user.username, filteringText)})
            </div>
          )))}
        </div>
      )}
    </div>
  );
};

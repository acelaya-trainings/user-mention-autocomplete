import { FC } from 'react';
import { User } from '../data';
import './UsersDropdown.css';

interface UsersDropdownProps {
  users: User[];
  filteringText: string;
}

const HighlightText: FC<{ text: string, filteringText: string }> = ({ text, filteringText }) => (
  <>
    {text.split(filteringText).map(
      (part, index, array) => array.length === index + 1 ? part : <>{part} <span className="comments-widget-users-dropdown__list-item--highlight">{filteringText}</span></>
    )}
  </>
)

export const UsersDropdown: FC<UsersDropdownProps> = ({ users, filteringText }) => {
  return (
    <>
      {[
        ...users.filter(({ name, username }) => name.toLowerCase().startsWith(filteringText) || username.toLowerCase().startsWith(filteringText)),
        ...users.filter(({ name, username }) => (!name.toLowerCase().startsWith(filteringText) && name.toLowerCase().includes(filteringText)) || (!username.toLowerCase().startsWith(filteringText)) && username.toLowerCase().includes(filteringText)),
      ].slice(0, 10).map(((user, index) => (
        <div key={`${user.username}_${index}`} className="comments-widget-users-dropdown__list-item">
          <img src={user.avatar_url} alt={`Avatar for user "${user.name}"`} className="comments-widget-users-dropdown__list-avatar-img" />
          <HighlightText text={user.name} filteringText={filteringText} /> (<HighlightText text={user.username} filteringText={filteringText} />)
        </div>
      )))}
    </>
  )
}

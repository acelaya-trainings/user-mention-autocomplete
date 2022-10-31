import { FC, Fragment } from 'react';
import { User } from '../data';
import './UsersDropdown.css';

interface UsersDropdownProps {
  users: User[];
  filteringText: string;
}

const HighlightText: FC<{ text: string, filteringText: string }> = ({ text, filteringText }) => (
  <>
    {text.split(filteringText).map(
      (part, index, array) => (
        <Fragment key={`${part}_${index}`}>
          {array.length === index + 1 ? part : <>{part} <span className="comment-widget-users-dropdown__list-item--highlight">{filteringText}</span></>}
        </Fragment>
      )
    )}
  </>
)

export const UsersDropdown: FC<UsersDropdownProps> = ({ users, filteringText }) => {
  return (
    <div role="menu">
      {[
        ...users.filter(({ name, username }) => name.toLowerCase().startsWith(filteringText) || username.toLowerCase().startsWith(filteringText)),
        ...users.filter(({ name, username }) => !name.toLowerCase().startsWith(filteringText) && !username.toLowerCase().startsWith(filteringText) && (name.toLowerCase().includes(filteringText) || username.toLowerCase().includes(filteringText))),
      ].slice(0, 10).map(((user, index) => (
        <div
          key={`${user.username}_${user.name}_${user.avatar_url}`}
          role="menuitem"
          className="comment-widget-users-dropdown__list-item"
        >
          <img src={user.avatar_url} alt={`Avatar for user "${user.name}"`} className="comment-widget-users-dropdown__list-avatar-img" />
          <HighlightText text={user.name} filteringText={filteringText} /> (<HighlightText text={user.username} filteringText={filteringText} />)
        </div>
      )))}
    </div>
  )
}

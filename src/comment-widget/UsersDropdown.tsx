import { FC, Fragment } from 'react';
import { User } from '../data';
import './UsersDropdown.css';
import { filterUsersByText } from './utils';

interface UsersDropdownProps {
  users: User[];
  filteringText: string;
  selectUser: (user: User) => void;
}

const HighlightText: FC<{ text: string, filteringText: string }> = ({ text, filteringText }) => (
  <>
    {text.split(filteringText).map(
      (part, index, array) => (
        <Fragment key={`${part}_${index}`}>
          {array.length === index + 1
            ? part
            : <>{part} <span className="comment-widget-users-dropdown__list-item--highlight">{filteringText}</span></>}
        </Fragment>
      )
    )}
  </>
)

export const UsersDropdown: FC<UsersDropdownProps> = ({ users, filteringText, selectUser }) => {
  return (
    <div role="menu">
      {filterUsersByText(users, filteringText).map(((user) => (
        <div
          key={`${user.username}_${user.name}_${user.avatar_url}`}
          role="menuitem"
          className="comment-widget-users-dropdown__list-item"
          onClick={() => selectUser(user)}
        >
          <img src={user.avatar_url} alt={`Avatar for user "${user.name}"`} className="comment-widget-users-dropdown__list-avatar-img" />
          <HighlightText text={user.name} filteringText={filteringText} /> (<HighlightText text={user.username} filteringText={filteringText} />)
        </div>
      )))}
    </div>
  )
}

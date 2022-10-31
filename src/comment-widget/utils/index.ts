import { User } from '../../data';

export const filterUsersByText = (users: User[], filteringText: string): User[] => {
  const caseInsensitiveFilteringText = filteringText.toLowerCase();
  const usersStartingByFilterText = users.filter(
    ({ name, username }) =>
      name.toLowerCase().startsWith(caseInsensitiveFilteringText) ||
      username.toLowerCase().startsWith(caseInsensitiveFilteringText)
  );
  const usersContainingButNotStartingByFilteringText = users.filter(
    ({ name, username }) =>
      !name.toLowerCase().startsWith(caseInsensitiveFilteringText) &&
      !username.toLowerCase().startsWith(caseInsensitiveFilteringText) &&
      (
        name.toLowerCase().includes(caseInsensitiveFilteringText) ||
        username.toLowerCase().includes(caseInsensitiveFilteringText)
      )
  );

  // We prioritize users starting with the filtering text, but complete a list of up to 10 items which also contain that text
  return [...usersStartingByFilterText, ...usersContainingButNotStartingByFilteringText].slice(0, 10);
};

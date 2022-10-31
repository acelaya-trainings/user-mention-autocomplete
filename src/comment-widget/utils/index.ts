import { User } from '../../data';

interface GroupedFilteredUsers {
  usersStartingByFilterText: User[];
  usersContainingButNotStartingByFilteringText: User[];
}

export const filterUsersByText = (users: User[], filteringText: string): User[] => {
  const caseInsensitiveFilteringText = filteringText.toLowerCase();
  const { usersStartingByFilterText, usersContainingButNotStartingByFilteringText } = users.reduce<GroupedFilteredUsers>(
    (acc, user) => {
      const { name, username } = user;

      if (
        name.toLowerCase().startsWith(caseInsensitiveFilteringText) ||
        username.toLowerCase().startsWith(caseInsensitiveFilteringText)
      ) {
        acc.usersStartingByFilterText.push(user);
      } else if (
        name.toLowerCase().includes(caseInsensitiveFilteringText) ||
        username.toLowerCase().includes(caseInsensitiveFilteringText)
      ) {
        acc.usersContainingButNotStartingByFilteringText.push(user);
      }

      return acc;
    },
    { usersStartingByFilterText: [], usersContainingButNotStartingByFilteringText: [] }
  )

  // We prioritize users starting with the filtering text, but complete a list of up to 10 items with those which also contain the text
  return [...usersStartingByFilterText, ...usersContainingButNotStartingByFilteringText].slice(0, 10);
};

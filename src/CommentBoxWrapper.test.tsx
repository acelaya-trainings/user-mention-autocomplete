import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { User } from './data';
import { CommentBoxWrapper } from './CommentBoxWrapper';

const users: User[] = [
  {
    name: 'User',
    username: 'user1',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
  {
    name: 'Foo Foo',
    username: 'foo',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
  {
    name: 'Contains user',
    username: 'someone',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
  {
    name: 'Bar Bar',
    username: 'bar',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
  {
    name: 'User2',
    username: 'user2',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
  {
    name: 'R is the first letter',
    username: 'user3',
    avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
  },
];

const setUp = (loadUsers: () => Promise<User[]>) => ({
  user: userEvent.setup(),
  ...render(<CommentBoxWrapper loadUsers={loadUsers} />),
})

test('renders loading status in dropdown until users have been loaded', async () => {
  const { user } = setUp(() => new Promise(resolve => setTimeout(() => resolve([]), 2000)));

  await user.type(screen.getByPlaceholderText('Write a comment...'), 'I totally agree, @user');
  expect(screen.getByText('Loading users...')).toBeInTheDocument();
});

test.each([
  ['user', ['User', 'User2', 'R is the first letter', 'Contains user']],
  ['foo', ['Foo Foo']],
  ['r', ['R is the first letter', 'User', 'Contains user', 'Bar Bar', 'User2']],
])('shows filtered list of users based on input after "@" character', async (searchTerm, expectedUsers) => {
  const { user } = setUp(() => Promise.resolve(users));

  await user.type(screen.getByPlaceholderText('Write a comment...'), `I totally agree, @${searchTerm}`);
  const images = screen.getAllByRole('img');

  expect(images).toHaveLength(expectedUsers.length);
  expectedUsers.forEach((user, index) => {
    expect(images[index]).toHaveAttribute('alt', expect.stringContaining(`"${user}"`));
  });
});

test('dropdown comes and goes while text in the input changes', async () => {
  const { user } = setUp(() => Promise.resolve(users));
  const assertUsers = (matchingUsers: RegExp[], nonMatchingUsers: RegExp[]) => {
    matchingUsers.forEach((name) => expect(screen.getByRole('menuitem', { name })).toBeInTheDocument());
    nonMatchingUsers.forEach((name) => expect(screen.queryByRole('menuitem', { name })).not.toBeInTheDocument());
  };

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  assertUsers([], [/^User/, /^Foo Foo/, /^Contains user/, /^Bar Bar/, /^User2/, /^R is the first letter/]);

  await user.type(screen.getByPlaceholderText('Write a comment...'), 'no mention');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  assertUsers([], [/^User/, /^Foo Foo/, /^Contains user/, /^Bar Bar/, /^User2/, /^R is the first letter/]);

  await user.type(screen.getByPlaceholderText('Write a comment...'), '@');
  assertUsers([], [/^User/, /^Foo Foo/, /^Contains user/, /^Bar Bar/, /^User2/, /^R is the first letter/]);

  await user.type(screen.getByPlaceholderText('Write a comment...'), 'r2');
  expect(screen.getByRole('menu')).toBeInTheDocument();
  assertUsers([/User2/], [/^User/, /^Foo Foo/, /^Contains user/, /^Bar Bar/, /^R is the first letter/]);

  await user.type(screen.getByPlaceholderText('Write a comment...'), '{Backspace}');
  expect(screen.getByRole('menu')).toBeInTheDocument();
  assertUsers([/User2/, /User(?!2)/, /Contains user/, /Bar Bar/, /R is the first letter/], [/^Foo Foo/]);

  await user.type(screen.getByPlaceholderText('Write a comment...'), '{Backspace}{Backspace}');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  assertUsers([], [/^User/, /^Foo Foo/, /^Contains user/, /^Bar Bar/, /^User2/, /^R is the first letter/]);
});

test('once a user is selected, filtering text is replaced with user\'s name', async () => {
  const { user } = setUp(() => Promise.resolve(users));

  await user.type(screen.getByPlaceholderText('Write a comment...'), 'I totally agree, @foo');
  await user.click(screen.getByRole('menuitem', { name: /Foo Foo/ }));

  expect(screen.getByPlaceholderText('Write a comment...')).toHaveValue('I totally agree, @Foo Foo');
});

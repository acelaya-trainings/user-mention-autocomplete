import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MentionTextArea } from './MentionTextArea';
import { User } from '../data';

const setUp = (loadUsers: () => Promise<User[]>) => ({
  user: userEvent.setup(),
  ...render(<MentionTextArea loadUsers={loadUsers} />),
})

test('renders loading status in dropdown until users have been loaded', async () => {
  const { user } = setUp(() => new Promise(resolve => setTimeout(() => resolve([]), 2000)));

  await user.type(screen.getByPlaceholderText('Write a comment...'), 'I totally agree @user');
  expect(screen.getByText('Loading users...')).toBeInTheDocument();
});

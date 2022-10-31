import { User } from '../../data';
import { filterUsersByText } from './index';

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

test.each([
  ['foo', [
    {
      name: 'Foo Foo',
      username: 'foo',
      avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
    }
  ]],
  ['r', [
    {
      name: 'R is the first letter',
      username: 'user3',
      avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
    },
    {
      name: 'User',
      username: 'user1',
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
  ]],
  ['SomEOne', [
    {
      name: 'Contains user',
      username: 'someone',
      avatar_url: 'https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm',
    },
  ]],
])('filterUsersByText returns matching users in proper order', (filteringText, expectedUsers) => {
  expect(filterUsersByText(users, filteringText)).toEqual(expectedUsers);
})

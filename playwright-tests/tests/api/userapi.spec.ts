import { testUser } from './../../test-data/testUsers';
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001/api/users';

test.describe('User API Endpoints', () => {

  test('Create a new user', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: testUser
    });
    console.log('Create User Response:: ', response)
    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.username).toBe('testuser@test.com');
    expect(user.name).toBe('Test User');
  });

  test('Delete a user', async ({ request }) => {
    const username = 'testuser@test.com';
    const response = await request.delete(`${BASE_URL}/${username}`);
    expect(response.status()).toBe(204);
  });

  test('Attempt to delete a non-existent user', async ({ request }) => {
    const username = 'nonexistentuser';
    const response = await request.delete(`${BASE_URL}/${username}`);
    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error.error).toBe('User not found');
  });
});

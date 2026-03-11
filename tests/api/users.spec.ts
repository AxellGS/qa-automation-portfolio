import { test, expect, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('DummyJSON API Tests - User Management', () => {

  test('should list users and validate schema', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('/users?limit=2');

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body).toHaveProperty('users');
    expect(body).toHaveProperty('total');
    expect(Array.isArray(body.users)).toBeTruthy();
    expect(body.users[0]).toHaveProperty('email');
  });

  test('should create a new user dynamically', async ({ request }: { request: APIRequestContext }) => {
    const userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 })
    };

    const response = await request.post('/users/add', {
      data: userData
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.firstName).toBe(userData.firstName);
    expect(body).toHaveProperty('id');
  });
});

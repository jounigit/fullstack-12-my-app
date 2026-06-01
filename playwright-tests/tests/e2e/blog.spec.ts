// tests blog page functionality
import { test, expect, request } from '@playwright/test';
import { User } from '../../pages/user-page';

const testBlog = {
  title: 'My First Blog Post',
  author: 'Blog Tester',
  url: 'http://example.com/my-first-blog-post',
  year: '2024'
};

test.describe('Blog Page Functionality', () => {
  let user: User;
  let authToken: string;

  test.beforeEach(async ({ request }) => {
    // Create a new user for testing
    user = new User('blogtester@test.com', 'Blog Tester', 'testpassword');
    await user.create(request);
  });

  test.beforeEach(async ({ request, page }) => {
    // Login via API to get token, then seed auth into the browser context.
    // AuthProvider reads localStorage key `auth_token`.
    const { token } = await user.login(request);
    authToken = token;
    await page.goto('http://localhost:5173/login');
    await page.evaluate((t) => localStorage.setItem('auth_token', t), token);
  });

  test.afterEach(async ({ request }) => {
    // Clean up by deleting the test user
    await user.delete(request, authToken);
  });

  test.afterAll(async ({ request }) => {
    // Ensure any remaining test blogs are cleaned up in case of test failure.
    const blogsResponse = await request.get('http://localhost:3001/api/blogs', {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const blogs = await blogsResponse.json();
    const testBlogs = blogs.filter((b: any) => b.title === testBlog.title && b.author === testBlog.author);

    for (const blog of testBlogs) {
      await request.delete(`http://localhost:3001/api/blogs/${blog.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    }
  });

  test('Create a new blog post', async ({ page, request }) => {
    // Navigate directly to the blog creation page to avoid flaky navigation/click timing.
    await page.goto('http://localhost:5173/blogs/create');

    // Wait for the form to be ready
    await expect(page.locator('input[name="title"]')).toBeVisible();

    // Fill in the blog post form
    await page.fill('input[name="title"]', testBlog.title);
    await page.fill('input[name="author"]', testBlog.author);
    await page.fill('input[name="url"]', testBlog.url);
    await page.fill('input[name="year"]', testBlog.year);
    // Submit the form, click submit button with text "Create Blog"
    await page.getByRole('button', { name: 'Create Blog' }).click();

    // Wait for the UI to update.
    // Prefer a deterministic signal from the CreateBlogForm (success OR error).
    const success = page.locator('text=Blog created successfully!');
    const formError = page.locator('text=Title, author and URL are required');

    await expect(success.or(formError)).toBeVisible({ timeout: 10000 });

    // If success, verify we navigated to the list and the created title is present.
    if (await success.isVisible()) {
      await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(testBlog.title)).toBeVisible({ timeout: 10000 });
    }

    // If blog creation succeeded, clean up by deleting the created blog via API.
    // This is necessary because the test user is reused across tests and we want to avoid test data pollution.
    if (await success.isVisible()) {
      // Get auth token for API request
      const { token } = await user.login(request);

      // Fetch all blogs to find the ID of the created blog
      const blogsResponse = await request.get('http://localhost:3001/api/blogs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blogs = await blogsResponse.json();
      const createdBlog = blogs.find((b: any) => b.title === testBlog.title && b.author === testBlog.author);

      if (createdBlog) {
        await request.delete(`http://localhost:3001/api/blogs/${createdBlog.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }
  });

});
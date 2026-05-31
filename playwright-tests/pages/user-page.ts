// user class fixture for user page tests
export class User {
  constructor(
    public username: string,
    public name: string,
    public password: string
  ) 
  {
    // parameter properties are handled by TypeScript; body can be empty
  }
  
  async create(request: any) {
    const response = await request.post('http://localhost:3001/api/users', {
      data: {
        username: this.username,
        name: this.name,
        password: this.password
      }
    });
    return response;
  }

  // Login with username and password inputs, set localstorage token 
  // and return token and user data
  async login(request: any) {
    const response = await request.post('http://localhost:3001/api/login', {
      data: {
        username: this.username,
        password: this.password
      }
    });

    if (!response.ok()) {
      throw new Error('Login failed');
    }

    const { user: userData, token } = await response.json();
    return { userData, token };
  }

  async delete(request: any, token?: string) {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await request.delete(`http://localhost:3001/api/users/${this.username}`, {
      headers
    });
    return response;
  }
}


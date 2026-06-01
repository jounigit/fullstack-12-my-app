// blog class to be used in blog.spec.ts
export class Blog {
  constructor(
    public title: string,
    public author: string,
    public url: string,
    public year: string
  ) 
  {
    // parameter properties are handled by TypeScript; body can be empty
  }

    async create(request: any, token: string) { 
    const response = await request.post('http://localhost:3001/api/blogs', {
      data: {
        title: this.title,  
        author: this.author,
        url: this.url,
        year: this.year
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  }

    async delete(request: any, blogId: string, token: string) {
    const response = await request.delete(`http://localhost:3001/api/blogs/${blogId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  }
}   

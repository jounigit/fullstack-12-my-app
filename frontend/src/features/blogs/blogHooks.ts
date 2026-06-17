import { getBlogs, getBlog } from "@service/blogs";
import useSWR from "swr";

export function useBlogs() {
  const { data: blogs, mutate } = useSWR("/api/blogs", getBlogs, { suspense: true });
  return {
    blogs,
    mutate,
  };
}

export function useBlog(id: number) {
  const { data: blog } = useSWR(`/api/blogs/${id}`, () => getBlog(id), { suspense: true });

  return {
    blog,
  };
}
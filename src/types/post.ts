export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
}

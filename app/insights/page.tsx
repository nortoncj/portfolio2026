import { getPost } from "@/sanity/sanity-utils";

type Props = {
    params: {post: string}
}
export default async function Post({ params }: Props) {
    const slug = params.post;
    const post = await getPost(slug);
  return <div className="">Project here</div>;
}

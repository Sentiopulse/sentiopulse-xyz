import PostBrowser from "../../components/PostComponents/post-browser";

export default function FetchPost() {
  return (
    <div className="container mx-auto py-8 px-4 bg-white font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
        Posts
      </h1>
      <PostBrowser />
    </div>
  );
}

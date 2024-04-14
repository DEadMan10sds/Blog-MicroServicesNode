import CreatePost from "./components/Posts/CreatePost";
import ListPosts from "./components/Posts/ListPosts";

function App() {
  return (
    <div className="container mt-8 ">
      <div className="flex align-middle justify-center">
        <CreatePost />
      </div>
      <ListPosts />
    </div>
  );
}

export default App;

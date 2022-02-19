import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlogForm } from './index/blog/blog.form';
import { BlogState } from "./index/blog/blog.state";
import { BlogList } from "./index/blog/blog.index";
import { Header } from "./index/navigation";


function App() {
  return (
    <div>
      <BlogState>
        <Header title={"Blog"} />
        <Routes>
          <Route index element={<BlogList />} />
          <Route path="blog" element={<BlogForm />} />
        </Routes>
      </BlogState>
    </div>
  );
}

export default App;

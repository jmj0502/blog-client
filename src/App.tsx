import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlogForm } from './index/blog/blog.form';
import { BlogList } from "./index/blog/blog.index";
import { BlogState } from "./index/blog/blog.state";
import { Blog } from "./index/blog/blog";
import { LoginState } from "./index/login/login.state";
import { Header } from "./index/navigation";
import { Login } from "./index/login/login";


function App() {
  return (
    <>
      <LoginState>
        <BlogState>
          <Header title={"Blog"} />
          <Routes>
            <Route index element={<BlogList />} />  
            <Route path="login" element={<Login />} />
            <Route path="blog" element={<BlogForm />} />
            <Route path="blog/:blogId" element={<Blog />}/>
          </Routes>
        </BlogState>
      </LoginState>
    </>
  );
}

export default App;

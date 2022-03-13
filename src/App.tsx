import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlogForm } from './index/blog/blog.form';
import { BlogState } from "./index/blog/blog.state";
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
          { /* <Route index element={<BlogList />} /> */ }
            <Route index element={<Login />} />
            <Route path="blog" element={<BlogForm />} />
          </Routes>
        </BlogState>
      </LoginState>
    </>
  );
}

export default App;

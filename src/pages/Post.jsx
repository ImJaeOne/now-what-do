import React, { useState } from 'react';
import S from '../style/Post/Post.style';
const MOCK_DATA = ['일상', '운동', '취미', '맛집', '기타'];

const Post = () => {
  const [post, setPost] = useState({
    postTitle: '',
    postCategory: '',
    postContent: '',
    postFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileImage = URL.createObjectURL(e.target.files[0]);
    setPost((prev) => ({ ...prev, postFile: fileImage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('postTitle', post.postTitle);
    formData.append('postCategory', post.postCategory);
    formData.append('postContent', post.postContent);
    if (post.postFile) {
      formData.append('postFile', post.postFile);
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.PostSection>
        <S.PostLabel htmlFor="post-title">
          제목
          <select
            name="postCategory"
            value={post.postCategory}
            onChange={handleChange}
          >
            <option value="">카테고리를 선택하세요</option>
            {MOCK_DATA.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <S.PostInput
            id="post-title"
            name="postTitle"
            type="text"
            value={post.postTitle}
            onChange={handleChange}
          />
        </S.PostLabel>
      </S.PostSection>
      <S.PostSection>
        <S.PostLabel>
          내용
          <S.PostInput
            name="postContent"
            type="text"
            value={post.postContent}
            onChange={handleChange}
          />
        </S.PostLabel>
      </S.PostSection>
      <S.PostSection>
        <label htmlFor="input-file">첨부파일</label>
        <S.FileLabel htmlFor="input-file">{post.postFile}</S.FileLabel>
        <label htmlFor="input-file">업로드</label>
        <input
          type="file"
          id="input-file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </S.PostSection>
      <S.PostSubmitButton type="submit">제출</S.PostSubmitButton>
    </S.FormContainer>
  );
};

export default Post;

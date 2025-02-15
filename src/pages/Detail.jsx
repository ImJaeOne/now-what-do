import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase/client';

const Detail = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const [post, setPost] = useState({
    title: '',
    detail: '',
    date: '',
    category: '',
    nickname: '',
    url: '',
  });

  useEffect(() => {
    const getPostAndComments = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, users: user_num(user_nickname),comments(*)')
        .eq('post_num', 87)
        .single();

      if (error) {
        console.error('포스팅에러', error);
      } else {
        setPost({
          title: data.post_title,
          detail: data.post_detail,
          date: data.post_date,
          category: data.post_category,
          nickname: data.users.user_nickname,
          url: data.post_img_url,
        });
        setComments(data.comments);
      }
    };
    getPostAndComments();
  }, []);

  console.log(post);
  console.log(comments);

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('댓글을 입력해 주세요.');
      setNewComment('');
      return;
    }

    const { data, error } = await supabase.from('comments').insert({
      post_num: 87,
      comment_content: newComment,
    });

    if (error) {
      console.error(error);
    } else {
      alert('게시성공');
      setComments((comments) => [...comments, data]);
      setNewComment('');
    }
  };

  const { title, detail, category, nickname, url } = post;

  return (
    <StDetailContainer>
      <StHeaderInDetail>
        <div>
          <StBadge>{category}</StBadge>
          {title}
        </div>
        <StUserInfo>
          <StImageField />
          <div>{nickname}</div>
        </StUserInfo>
        <span>수정 | 삭제</span>
      </StHeaderInDetail>
      <StMainContent>
        <StPhotoBox>
          <img src={url} alt="사진" />
        </StPhotoBox>
        <StContentBox>
          <StPostContent>
            <p>{detail}</p>
          </StPostContent>
          <div>댓글영역</div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>
                <span>{comment.user_num}</span>
                {comment.comment_content}
              </p>
            </div>
          ))}
          <StCommentBox>
            <form onSubmit={commentSubmitHandler}>
              <div>
                <span>좋아요 |</span>
                <span> 코멘트</span>
              </div>
              <div>좋아요 갯수</div>
              <input
                name="comment_content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                type="text"
                placeholder="댓글 달기..."
              />
              <button type="submit">게시</button>
            </form>
          </StCommentBox>
        </StContentBox>
      </StMainContent>
    </StDetailContainer>
  );
};

export default Detail;

const StDetailContainer = styled.div`
  width: 100%;
  min-height: 70vh;
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: orange;
  border-radius: 30px;
`;

const StHeaderInDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  padding: 10px 20px;
  color: white;
  border-radius: 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StImageField = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgray;
  margin-left: 10px;
`;

const StBadge = styled.span`
  background-color: green;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  margin-right: 5px;
`;

const StMainContent = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const StPhotoBox = styled.div`
  flex: 1;
  background-color: lightgray;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 30px;
  }
`;

const StContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
`;

const StPostContent = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const StCommentBox = styled.div`
  flex: 1;
  background-color: #f3f3f3;
  border-radius: 30px;
  padding: 15px;
`;

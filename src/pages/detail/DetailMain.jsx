import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { supabase } from '../../supabase/client';
import S from './detailStyle/MainInDetail.style';
import CommentBtn from '../../components/common/CommentBtn';
import LikeBtn from '../../components/common/LikeBtn';
import UserProfile from '../../components/common/UserProfile';

const DetailMain = ({ targetId, post, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  // 코멘트 입력
  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('댓글을 입력해 주세요.');
      setNewComment('');
      return;
    }
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_num: targetId,
        comment_content: newComment,
        user_num: user.num,
      })
      .select('*, users: user_num(user_nickname)');
    if (error) {
      console.error(error);
    }

    setComments((prev) => [...prev, ...data]);
    setNewComment('');
  };
  console.log(post);
  // 코멘트 삭제
  const commentDeleteHandler = async (commentId) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('comment_num', commentId);

    if (error) {
      console.error(error);
    } else {
      setComments((prev) =>
        prev.filter((comment) => comment.comment_num !== commentId),
      );
      alert('댓글이 삭제되었습니다.');
    }
  };

  const { detail, nickname, img_url } = post;

  return (
    <S.MainContent>
      <S.PhotoBox>
        <img src={img_url || null} alt="사진" />
      </S.PhotoBox>
      <S.ContentBox>
        <S.PostContent>
          <S.UserInfo>
            <UserProfile size="20px" src={post.users?.user_profile} />
            {nickname}
          </S.UserInfo>
          <p>{detail}</p>
        </S.PostContent>
        <S.CommentListContainer>
          {comments.map((comment) => {
            return (
              <div key={comment.comment_num}>
                <div>
                  <S.ImageField
                    src={post.comments[0].users.user_profile || profile}
                  />
                  <S.UserInfo>{comment.users.user_nickname}</S.UserInfo>
                  <div>{comment.comment_content}</div>
                  {comment.user_num == user.num && (
                    <button
                      onClick={() => commentDeleteHandler(comment.comment_num)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </S.CommentListContainer>
        <S.CommentBox>
          <span>
            <LikeBtn user={user} post={post} size={15} able={true} />
          </span>
          <span>
            <CommentBtn post={post} size={15} />
          </span>
          <form onSubmit={commentSubmitHandler}>
            <input
              name="comment_content"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="댓글 달기..."
            />
            <button type="submit">게시</button>
          </form>
        </S.CommentBox>
      </S.ContentBox>
    </S.MainContent>
  );
};

export default DetailMain;

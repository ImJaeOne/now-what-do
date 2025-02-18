import { FiArrowLeft } from 'react-icons/fi';
import { CategoryBadge } from '../../components/common/CategoryBadge';
import S from './detailStyle/HeaderInDetail.style';
import { IconBtn } from '../../components/common/IconBtn';

const DetailHeader = ({ post }) => {
  const { title, category } = post;

  const closeHandler = () => {
    navigate(-1);
  };

  return (
    <S.HeaderInDetail>
      <S.TitleContainer>
        <CategoryBadge category={category} />
        {title}
      </S.TitleContainer>
      <span>
        <IconBtn size={30} onClick={closeHandler}>
          <FiArrowLeft />
        </IconBtn>
      </span>
    </S.HeaderInDetail>
  );
};

export default DetailHeader;

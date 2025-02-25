import styled from 'styled-components';

const S = {};

S.AuthInput = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
  type: props.type,
  name: props.name,
  value: props.value,
  onChange: props.onChange,
  id: props.id,
  minLength: props.minLength,
  maxLength: props.maxLength,
}))`
  border: 1px solid #f3c301;
  border-radius: 30px;
  padding: 10px;
  font-size: 15px;
  width: 300px;

  &:focus {
    outline: 1px solid #5e4c05;
  }
`;

export default S;

import styled, { css } from 'styled-components';

export const Form = styled.form``;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.4rem;
  display: inline-block;
`;

export const Row = styled.div<{ flex?: boolean }>`
  margin-bottom: 1.2rem;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid rgba(217, 217, 217, 0.5);

      button {
        margin-top: 1rem;
      }
    `}
`;

export const Types = styled.div`
  display: flex;
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const ImageBox = styled.div`
  margin-top: 0.6rem;
  width: 30rem;
  height: 20rem;
  border: 2px solid rgba(217, 217, 217, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

import styled from 'styled-components';

export const Table = styled.table`
  border-radius: 0.8rem 0.8rem 0 0;
  width: 100%;
  overflow: hidden;
  td,
  th {
    padding: 1rem 1.6rem;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(202, 202, 202, 0.6);
  :nth-child(even) {
    background: rgba(202, 202, 202, 0.3);
  }
`;

export const TableHead = styled.th`
  background: ${({ theme }) => theme.colors.primary.light};
  color: #fff;
  text-align: start;
  font-weight: 500;
`;

export const TableData = styled.td`
  :first-child {
    width: 65%;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }

  div button:nth-child(1) {
    margin-right: 1rem;
  }
`;

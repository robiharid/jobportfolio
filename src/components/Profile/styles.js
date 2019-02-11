import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  /* margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box; */
`;
export const ProfileLeftColumn = styled.div`
  .profileItem {
    margin-top: 50px;
  }
  .columnButton {
    
    width: 30%;
  }
  justify-content: left;
  align-items: left;
  display: flex;
  flex-direction: column;
  flex: 20;
`;
export const ProfileRightColumn = styled.div`
  flex: 80;
`;

import styled from "styled-components";

const FrameSty = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;
  background-color: #fff;
  box-size: border-box;
  box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
`

const ImgSty = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
  background: #f7f7f7;

  img {
    display: inline-block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`

const NameSty = styled.div`
  height: 30px;
  margin-top: 10px;
  padding: 0 5px;
  box-sizing: border-box;
`


export {
  FrameSty,
  ImgSty,
  NameSty
}
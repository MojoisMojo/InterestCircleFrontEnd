import styled from "styled-components";
import PropTypes from 'prop-types';

// Define ImgFrameStyProps for prop validation
const ImgFrameSty = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: ${props => props.objectfit};
  }
`;

// Optional: Define propTypes for prop validation
ImgFrameSty.propTypes = {
  objectfit: PropTypes.oneOf(["cover", "contain", "fill", "none", "scale-down"])
};

export default ImgFrameSty;

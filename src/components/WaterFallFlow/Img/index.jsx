import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ImgFrameSty from './style';
import PropTypes from 'prop-types';

//枚举图片填充方式
const ObjectFit = {
  contain: 'contain',
  cover: 'cover',
  fill: 'fill',
  none: 'none',
  scaleDown: 'scale-down',
};

function LazyImg(props) {
  const {
    src,
    alt,
    isLazy,
    style,
    finishedLoading,
    objectfit,
  } = props;
  const imgDom = useRef(null);
  const [isFinishLoad, setIsFinishLoad] = useState(false)

  useEffect(() => {
    if (imgDom.current === null || !isFinishLoad) {
      return
    }
    finishedLoading(imgDom.current)
  }, [isFinishLoad])

  useEffect(() => {
    if (imgDom.current === null || src === '') {
      return
    }
    if (!isLazy) {
      imgDom.current.src = src
      imgDom.current.onload = () => {
        setIsFinishLoad(true)
      }
      return
    }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imgDom.current.src = src;
          imgDom.current.onload = () => {
            setIsFinishLoad(true)
          }
          //使 IntersectionObserver 停止监听特定目标元素。
          observer.unobserve(imgDom.current);
        } else {
          console.log('元素离开视口');
        }
      });
    });
    observer.observe(imgDom.current);

    return () => {
      observer.disconnect();
    }
  }, [src])

  return (
    <ImgFrameSty style={style} objectfit={objectfit}>
      <img ref={imgDom} alt={alt} />
    </ImgFrameSty>
  )
}

LazyImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  isLazy: PropTypes.bool,
  style: PropTypes.object,
  finishedLoading: PropTypes.func,
  objectfit: PropTypes.oneOf(Object.keys(ObjectFit)),
};

export default LazyImg;
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { FrameSty, ImgSty, NameSty } from './style'
import PropTypes from 'prop-types';
import Img from '../Img'

function WaterfallFlowItem(props) {
  let { src, title, style = {}, sizeChange = () => { }, unitWidth, index, showBorder } = props
  let frameDom = useRef(null)
  let [isLoading, setIsLoading] = useState(false)
  let [imgInfo, setImgInfo] = useState({
    height: 1,
    width: 1
  })
  /** 是否初始化完成*/
  let isInitAccomplish = useRef(false)

  const imgHeight = useMemo(() => {
    return imgInfo.height * (unitWidth / imgInfo.width);
  }, [imgInfo, unitWidth])

  const finishedLoading = useCallback((imgDom) => {
    setImgInfo({
      height: imgDom.naturalHeight,
      width: imgDom.naturalWidth,
    })
    setIsLoading(true)
    isInitAccomplish.current = true
  }, [])

  useEffect(() => {
    isInitAccomplish.current && sizeChange(imgHeight + 40, index)
  }, [imgInfo])

  return (
    <FrameSty style={{
      ...style,
    }} ref={frameDom}>
      <ImgSty>
        {
          <Img
            isLazy={true}
            src={src}
            style={{
              visibility: isLoading ? 'visible' : 'hidden'
            }}
            finishedLoading={finishedLoading}
          />
        }
      </ImgSty>
      <NameSty>
        {title && title}
      </NameSty>
    </FrameSty>
  )
}

WaterfallFlowItem.propTypes = {
  showBorder: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  unitWidth: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  sizeChange: PropTypes.func,
};

export default WaterfallFlowItem;
import React, { useContext } from 'react';
import UserInfoCard from './components/UserInfoCard';
import CommentsViewer from './components/Post/CommentsViewer';
import { static_comments, static_mojo_user } from './assets/static';
import { Button } from '@mui/material';
import UserContext from './context/UserContext';

import CircleCreater from './components/CircleCreater';

const lengthVerification = (v, maxLength, data) => {
  let value = v.target.value;//antd组件中获取当前输入的值
  let len = 0;
  let result = "";
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
      len += 2;
      result += value.charAt(i);
    } else {
      len++;
      result += value.charAt(i);
    }
    if (len >= maxLength) {
      data.onChange(result)//react hook form中更新表单中的数据
      return result
    }
  }
  data.onChange(value)
  return value;
}

const TmpApp = () => {
  const { currUser, setCurrUser } = useContext(UserContext);
  return (
    <>
      <CircleCreater />
      {/* <Controller
        key={row.lotteryTitle || props.name}
        name={`lotterySkuList[${index}].lotteryTitle`}
        control={props.control}
        id={`lotterySkuList[${index}].lotteryTitle`}
        defaultValue={row.lotteryTitle || '1元支持，赢众筹新品'}
        rules={{
          required: props.required ? '请录入抽奖模块主标题！' : '',
        }}

        render={(data) => {
          return <TextArea
            onInput={(value) => lengthVerification(value, 20, data)}
            value={data.value}
            onPressEnter={(e) => e.preventDefault()}
            placeholder='主标题文案上限为20个字符（10个汉字）'
            disabled={props.disabled}
            key={row.lotteryTitle || props.name}
          />
        }}
      /> */}
    </>
  );
}


export default TmpApp;


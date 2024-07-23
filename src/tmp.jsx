import React from 'react';
import { useState } from 'react';
import SquareContainer from './components/SquareContainer';
import PostSender from './components/Sender/PostSender';
import { static_circle_card_info_daily, static_circle_card_info_game } from './assets/static';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

function TagsAutocomplete() {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={top100Films.map((option) => option.title)}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="freeSolo with Chips"
          placeholder="Favorites"
        />
      )}
    />
  );
}

const TmpApp = () => {
  return (
    <div>
      {/* <TagsAutocomplete/> */}
      <PostSender circles={[static_circle_card_info_daily, static_circle_card_info_game]} />
    </div>
  );
}

// 示例数据
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'Shawshank Redemption', year: 1994 },
  { title: 'Redemption', year: 1994 },
]
// 更多电影数据...

export default TmpApp;


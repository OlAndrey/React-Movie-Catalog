import { Container, FormControl, NativeSelect } from '@mui/material';
import React from 'react';
import { genreList } from "../../helpers/const";

type GenreFilterPropsType = {
    changeFilter: (value: string) => void
}

const GenreFilter: React.FC<GenreFilterPropsType> = ({ changeFilter }) => {
  return(
      <Container maxWidth={false} sx={{width: '170px', margin: "5rem auto 1.75rem auto", }}>
        <FormControl sx={{ background: "#888" }}>
            <NativeSelect
                defaultValue={genreList[0].id}
                onChange={e => changeFilter(e.target.value)}
                inputProps={{
                    name: 'genre',
                    id: 'genre'
                }}
                sx={{ color: "rgba(250, 250, 250, 0.87)", paddingLeft: "0.5em", "& svg": { color: "rgba(250, 250, 250, 0.87)" } }}
            >{
                genreList.map((item, i) => (
                    <option key={i} value={item.id}
                style={{ color: "#ccc", background: "#888"}}>{item.genre}</option>
                ))
             }
            </NativeSelect>
        </FormControl>
    </Container>
  )
};

export default GenreFilter;

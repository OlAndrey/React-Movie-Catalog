import { Container, FormControl, NativeSelect } from '@mui/material';
import React from 'react';
import { genreList } from "../../helpers/const";

interface IFilter {
    changeFilter: (value: string) => void
}

const GenreFilter: React.FunctionComponent<IFilter> = ({ changeFilter }) => {
  return(
      <Container maxWidth={false} sx={{width: '170px', margin: "5rem auto 1.75rem auto"}}>
        <FormControl>
            <NativeSelect
                defaultValue={genreList[0].id}
                onChange={e => changeFilter(e.target.value)}
                inputProps={{
                    name: 'genre',
                    id: 'genre'
                }}
            >{
                genreList.map((item, i) => (
                    <option key={i} value={item.id}>{item.genre}</option>
                ))
             }
            </NativeSelect>
        </FormControl>
    </Container>
  )
};

export default GenreFilter;

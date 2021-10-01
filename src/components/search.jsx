import React from "react";
import {
  InputGroup,
  Input,
} from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search';

const Search = (props) => {

  const handleChange = (event) => {
    props.onSearch(event.target.value);
  }

  return (
    <>
      <SearchIcon fontSize="medium"></SearchIcon>
      <InputGroup className="w-90 search-parent">
        <Input id="search-input" onChange={handleChange} placeholder="Search" className="search" type="text" />
      </InputGroup>
    </>
  )
}

export default Search

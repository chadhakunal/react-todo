import React from "react";
import {
  InputGroup,
  Input,
} from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';


const Search = (props) => {
  const handleChange = (event) => {
    props.onSearch(event.target.value);
  };

  return (
    <>
      <SearchIcon fontSize="medium"></SearchIcon>
      <InputGroup className="w-90 search-parent">
        <Input id="search-input" onChange={debounce(handleChange, 300)} placeholder="Search" className="search" type="text" />
      </InputGroup>
    </>
  )
}

export default Search

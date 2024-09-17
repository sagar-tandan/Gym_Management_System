import React, { useContext } from "react";
import { AllContext } from "../Context/Context";

const SearchMember = () => {
  const { query, setQuery } = useContext(AllContext);
  return <div>SearchMember</div>;
};

export default SearchMember;

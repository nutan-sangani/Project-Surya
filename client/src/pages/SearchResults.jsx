import React, { useState } from 'react';
import Header from '../components/Header';
import useStateContext from '../context/StateProvider';
import Card from '../components/Card';
import './css/SearchResults.css';
import PaginationDiv from '../components/PaginationDiv';
import axiosInstance from '../utils/axiosInstance';
import setDonor from '../utils/setDonor';
import { toast_error } from '../utils/toastify';
import CardMapper from '../utils/CardMapper';

function SearchResults(props) {
  const [state,dispatch] = useStateContext();

  function changeHandler(page){
    let query = state.searchResults.query;
    query=query+'&page='+page;
    axiosInstance.get('/book/search'+`?${query}`)
                     .then((res) => {
                        if(res.data.success === 1)
                        {
                            console.log(res.data.data.results);
                            const results = setDonor(res.data.data.results);
                            res.data.data.results=results;
                            res.data.data.query=state.searchResults.query;
                            dispatch({type:'ADD_USER_SEARCH_RESULTS',payload:res.data.data});
                        }
                        else toast_error(res.data.message);
                      })
                     .catch((err)=>console.log(err));
  };

  return (
    <div>
      <Header/>
      <PaginationDiv component={CardMapper} page={state.searchResults && state.searchResults.page} count={state.searchResults && state.searchResults.totalPages} changeFn={changeHandler} data={state.searchResults.results} classes='home--container no--img'  />
    </div>
  )
};

export default SearchResults;
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import React, { useState, useEffect } from 'react';
import { getPosts , getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination'
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const classes = useStyles()
    const [currentId, setCurrentId] = useState(0);
    const [search , setSerch] = useState('')
    const [tags , setTags] = useState([])
    const dispatch = useDispatch();
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
  

    const handleKeyPress = (e)=>{
      if(e.keyCode == 13){
        searchPost()
      }
    }

    const handleAdd = (tag) => setTags([...tags ,  tag])

    const handleDelete = (tagToDelete)=> setTags(tags.filter((tag)=> tag !== tagToDelete))
    const searchPost = ()=>{
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        history.push('/');
      } 
    }

    return (
        <Grow in>
        <Container maxwidth = "xl">
          <Grid container justify="space-between" alignItems="stretch"  className = {classes.gridContainer} spacing={3}>
            <Grid item xs={12} sm={6} md ={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md = {3}>
              <AppBar className = {classes.appBarSearch} position = "static" color = "inherit">
                <TextField
                name = "search"
                variant = "outlined"
                label = "Search Memories"
                fullWidth
                value = {search}
                onChange = {(e)=>{setSerch(e.target.value)}}
                onKeyPress = {handleKeyPress}
                
                />
        <ChipInput
          style = {{margin: '10px 0'}}
          value = {tags}
          onAdd = {handleAdd}
          onDelete = {handleDelete}
          label = "Search Tags"
          variant = "outlined"
        />
        <Button onClick = {searchPost} variant = "contained" className = {classes.serarchButton} color = "primary">Search</Button>
                </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

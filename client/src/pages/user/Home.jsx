import React,{useState,useEffect} from 'react'
import VoteCategories from '../../components/VoteCategories'
import Navbar from '../../components/Navbar'
import {Grid,Container,Paper, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import VoteVoteds from '../../components/VoteVoteds';
import {useSelector,useDispatch} from 'react-redux'
import {fetch} from '../../features/categories/categoriesSlice';
function Home() {
  const [selectedIndex,setSelectedIndex] = useState(0);
  const {loading,categories,error,success} = useSelector((state)=>state.categories);
  const dispatch = useDispatch();
  const [selectCategory,setSelectCategory]  = useState("");
  useEffect(()=>{
    dispatch(fetch({uri:"user"}))
  },[]);
  useEffect(()=>{
    if(success){
      setSelectCategory(categories[0].name)
    }
  },[categories,success])

  const handleChange = (e)=>{
    setSelectCategory(e.target.value);
    let index = categories.findIndex((c)=>c.name===e.target.value);
     setSelectedIndex(index)
  }

  return (
    <div style={{height:"100vh"}}>
        <Navbar />
        <Container sx={{margin:"2rem 0",height:"80%",}}>
          <Grid container spacing={2}  sx={{height:"100%"}}>

            <Grid item md={3} sx={{display:{xs:"none",md:"block"}}}>
                <VoteCategories setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} loading={loading} categories={categories} error ={error} />
            </Grid>
            <Grid item md={12} sx={{display:{xs:"block",md:"none"}}}>
                <div style={{width:"87vw"}}>
                  {
                    categories.length > 0 && (
                      <FormControl fullWidth sx={{m:1}}>
                      <InputLabel>Select Category</InputLabel>
                      <Select
                      fullWidth
                      label="Select Category"
                      value={selectCategory}
                      onChange={handleChange}
                      >
                        { categories.length > 0 && categories.map((c,index)=>(
                          <MenuItem
                            key={c._id}
                            value={c.name}
                          >
                            {c.name}
                          </MenuItem>
                        ))
                        }
                      </Select>
                    </FormControl>
                    )
                  }
                   
                </div>
             
            </Grid>
            <Grid item md={9} xs={12}>
                {
                  success && ( <VoteVoteds selectedIndex={selectedIndex} categories={categories} />)
                }
               
            </Grid>
          </Grid>
        </Container>
    </div>
  )
}

export default Home
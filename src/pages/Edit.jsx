import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../api';

export default function Edit() {
  // const params=useParams()
  // console.log(params.expenseId)
  const {expenseId}=useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount:0,
    category: "",
  });
  const [isLoading,setIsLoading]=useState(false)
  const fetchSingleExpense=async()=>{
    try {
      const res=await axios.get(`${baseUrl}/api/expense/view/${expenseId}`)
      //  console.log(res.data)
       if (res.data.success) {
        setFormData(res.data.expenseDetails)
       } else {
        toast.error(res.data.message);
       }
    } catch (error) {
     console.log(error)
    }
  };
  useEffect(()=>{
    fetchSingleExpense();
  },[])
  // console.log(formData);
  const handleSubmit = async() => {
    setIsLoading(true)
    // console.log(formData);
     const res=await axios.put(`${baseUrl}/api/expense/edit/${expenseId}`,formData);
    try {
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(()=>{
          navigate("/")
        },2000)
      } else {
        toast.error(res.data.message);
      }
    } 
    catch (error) {
      console.log(error);
    } finally{
      setTimeout(()=>{
        setIsLoading(false)},2000);
    }
    }
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" > Add Expenses details</Typography>
      </Box>
      <Box sx={{ backgroundColor: "grey", p: 4, display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField value={formData.title} fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} label="Enter Expense title" placeholder="Enter Expense title" sx={{ mb: 2 }}></TextField>
          <TextField value={formData.amount} fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} type="number" label="Enter Expense Amount" placeholder="Enter Expense Amount" sx={{ mb: 2 }}></TextField>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Expenses category</InputLabel>
            <Select
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              value={formData.category}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Select Expenses category"
              //   onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Shelter"}>Shelter</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <Button loading={isLoading} onClick={handleSubmit} sx={{ mb: 2 }} color='primary' variant="contained" fullWidth>Edited</Button>
          <Button component={Link} to="/" sx={{ mb: 2 }} color='secondary' variant="contained" fullWidth>View Entries</Button>
        </Paper>
      </Box>
    </Box>
  )
}

import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Task() {
  const tabledata=[
    {
        name:"item 1",
        price:150,
        edited:false,
        Coupn:"yes",
        in_stock:"yes",
        checked:false
  },
  {
      name:"item 2",
      price:200,
      edited:false,
      Coupn:"No",
      in_stock:"No",
      checked:true
  },
  {
    name:"item 3",
    price:200,
    edited:false,
    Coupn:"No",
    in_stock:"No",
    checked:true
  }
  ]
  const [data,setdata] = useState(tabledata);
  const [view,setview]=useState(data);
  const classes = useStyles();

  const modify=(selectedTaskIndex)=>{
    const check = data.map((task, index) => {
      if (index === selectedTaskIndex) {
        return {
          ...task, 
          checked: !task.checked
        };
      }
      return task;
    })
    setview(check)
    setdata(check)
  }

  const del=()=>{
    const final=data.filter((map)=>{
      return map.checked===false
    })
    setview(final)
    setdata(final)
    
  }
  const reset=()=>{
    const final=data.map((data)=>{
      if(data.checked===true){
        return {
          ...data,
          price:0,
          coupn:"NA",
          in_stock:"NA",
          checked:!data.checked
        }
      }
      return data
    })
    setview(final)
    setdata(final)
  }

  const search=(e)=>{
    const user=e.target.value.toLowerCase()
    if(user===" "){
      setview(data)
    }
    else{
    const final=data.filter((data)=>{
      return data.name.includes(user) 
    })
    setview(final)
  }
}


const changePrice=(selectedIndex)=>{
  const final=data.map((data,index)=>{
    if(selectedIndex===index){
      return {
        ...data,
        edited:!data.edited
      }
    }
    return data
  })
  setview(final)
  setdata(final)
}


const price=(e,selectedIndex)=>{
  const check = data.map((task, index) => {
    if (index === selectedIndex) {
      return {
        ...task, 
        price:e,
      };
    }
    return task;
  })
  setview(check)
  setdata(check)
}


  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Check box</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">name<input onChange={search}type="text"></input></TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Cuopn</TableCell>
            <TableCell align="right">In stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {view?.map((row,index) => {
            const add=()=>{
              modify(index)
            }
            const fieldChange=()=>{
              changePrice(index)
            }
            const newPrice=(e)=>{
              price(e.target.value,index)
            }
            return(
            <TableRow key={row.name}>
                <TableCell align="right"><input
              type="checkbox"
              onChange={add}
              checked={row.checked}
            /></TableCell>
                <TableCell align="right">{index}</TableCell>
              <TableCell align="right">
                {row.name}
              </TableCell>
            <TableCell  align="right">{row.edited===false?(<p onClick={fieldChange}>{row.price}</p>):
            (<div><form onSubmit={fieldChange}><input  onChange={newPrice}type="text" value={row.price}></input></form></div>)} </TableCell>
              <TableCell align="right">{row.Coupn}</TableCell>
              <TableCell align="right">{row.in_stock}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    <button onClick={del}>Delete</button>
    <button onClick={reset}>Reset</button>
    </>
  );
}
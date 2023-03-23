import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar, Chip } from "@mui/material";
    
    
  const paperStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    margin: '20px',
    height: "150px",
    width: "300px",
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  };
    
    
    
    {/* <Grid container direction="column"
    justifyContent='center'
    alignContent='center'>
        <Paper elevation={1} sx={paperStyle}>
          <div>
            { isLoading ? (<p>Loading...</p>) :
            (
              <div>
                <Chip
                  avatar={<Avatar alt="Remy Sharp" src="/static/images/avatar/1.png"/>}
                  label={"Usuario: "+usersData.data[0].username}
                  variant="filled"
                  sx={{margin: '10px'}}
                />
                <Chip
                  label={"Nombre: "+usersData.data[0].fullname}
                  variant="filled"
                  sx={{margin: '10px'}}
                />
                <Chip
                  label={"Antiguedad: "+new Date(usersData.data[0].hireDate).toLocaleDateString()}
                  variant="filled"
                  sx={{margin: '10px'}}
                />
              </div>
            )}
          </div>
        </Paper>
    </Grid> */}
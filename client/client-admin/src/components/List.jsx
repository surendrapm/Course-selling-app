import { ListItem, ListItemButton, ListItemText } from "@mui/material"


export const List = ()=>{
    {['All mail','Trash','Spam'].map((text)=>(
        <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          
        </ListItem>
    ))}
}
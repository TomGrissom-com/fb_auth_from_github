const express = require('express');
const app = express()

//currently in draft for practice
app.get('/api', (req, res)=>{
    res.json({"users": ["user01", "user02", "user03"]})
})

app.listen(5000, ()=>{console.log("server running on 5000 fuck!")})
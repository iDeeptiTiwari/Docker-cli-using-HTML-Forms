const express = require('express')
const {exec} = require('child_process')

const app = express()

app.get('/',(req,res) => {
	
	res.sendFile(__dirname+"/index.html")
})


app.get('/run',(req,res)=>{

    // res.send(__dirname+"/demo.html")

    // exec(req.query.cname,(err,stdout,stderr)=>{
    //     res.send("<pre>"+stdout+"</pre>")
    // })
    const cname = req.query.cname
    const cimage = req.query.cimage
    q = "docker run -itd --name "+cname+" "+cimage
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})

app.get('/listcontainer',(req,res)=>{

    
    q = "docker ps"
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})


app.get('/deletecontainer',(req,res)=>{

    var dname = req.query.dname
    q = "sudo docker rm -f "+dname
    exec(q,(err,stdout,stderr)=>{
        console.log(err)
        console.log(stderr)
         res.send("<pre>"+stdout+"</pre>")
    })

})


app.get('/ps',(req,res) => {

        
        exec("docker ps ",(err,stdout,stderr) => {
                res.send("<pre>"+stdout+"</pre>")
        
        })
})



app.listen(3000,()=>{console.log('web app is running')})
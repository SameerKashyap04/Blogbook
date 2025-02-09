 import express from "express";
 import bodyParser from "body-parser";

 const app = express();
 const port = 3000;
 var i = 0;
 
 let posts = [
    {id : 1 ,time : "January 03 at 12:02 pm" , name : "Sameer" , content : "Frist blog"},
    {id : 2 ,time : "January 25 at 09:30 am" , name : "Abinash" , content : "Second blog"},
 ];
 
 
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

 const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];



app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res )=>{
    res.render(`index.ejs`,{ posts : posts });
});
app.get("/create-post", (req, res )=>{
    res.render("create-post.ejs");
});
app.get("/account", (req, res )=>{
    res.render("account.ejs");
});
app.post("/posted" ,(req ,res)=>{
    var d = new Date();
    var datetime = month[d.getMonth()] + " " + d.getDate() + " at " + formatAMPM(d);
    const newPost = 
        {   id : posts.length + 1,
            time : datetime,
            name : req.body.name,
            content : req.body.content,
        };
    posts.push(newPost);
    res.redirect('/');
});
app.get(`/posts/view/:id`, (req,res)=>{
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId); 

    if (post) {
        res.render(`view.ejs` , { post : post });
    } else {
        res.status(404).send('Post not found'); 
    } 
})
app.get('/posts/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
      res.render('edit.ejs', {post});
    } else {
      res.status(404).send('Post not found');
    }
  });
app.post("/posts/edit/submit/:id" , (req,res)=>{
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);

    if (index !== -1) {
        posts[index].name = req.body.name;
        posts[index].content =  req.body.content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
})
app.get("/posts/delete/:id", (req,res)=>{
    const postId = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
})

app.listen(port , ()=> {
    console.log(`Listening on port ${port}`);
});
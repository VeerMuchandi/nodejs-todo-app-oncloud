var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: false}); 

const {Firestore} = require('@google-cloud/firestore');
const db = new Firestore();



module.exports = function(app) {

    app.get('/todo', async function(request, response) {
        try {
         const todos_output = await db.collection('todos').get();
         const todos=todos_output.docs.map(doc=>({id: doc.id, item: doc.data().item}));
          //const todos = [{ id: 1, item: "read first line"},{ id: 2, item: "read second line"} ];
      
          console.log(todos);
          response.render("todo", {todos}); 
      
        } catch (error) {
          response.status(500).send(error.message);
        }
      });
      

      app.post('/todo', urlencodedparser, async function(request, response) {
  
        var data = request.body;
        console.log(data);
        // const newTodo = await db.collection('todo').add({item: 'new item'});
        const newTodo = await db.collection('todos').add(data);
        response.json(newTodo);
      
        });
      


        app.delete('/todo/:id', async function(request, response) {
            try {
              var deleteId= request.params.id;
              const newTodo = await db.collection('todos').doc(deleteId).delete();
              response.json(newTodo);
            } catch (error) {
              response.status(500).send(error.message);
            }
         });
       

};

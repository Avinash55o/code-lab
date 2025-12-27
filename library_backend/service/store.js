//dictionary based

const nextID= 1
const store={
    0:{id:'0',title:'abc',author:'me'}
}

//list all the books
function list(){
    return Object.values()
}

// get books with id
function get(id){
    return store[id] ?? null
}

//create
function create({title, author= null}){
    const id =nextID++;
    const book={id, title, author
    }
    store[id]= book;
    return book;
}

//update
function update(id, {title, author=null}){
    const book={id, title, author}
    store[id]=book
    return book
}


//delete
function del(id){
    delete store[id];
}


// THE MAP BASED
// import { randomUUID } from "crypto";

// const map = new Map();
// map.set("0", { id: "0", title: "Seed Book", author: "Seed" });

// function list() { return Array.from(map.values()); }
// function get(id) { return map.get(id) ?? null; }
// function create({ title, author = null }) {
//   const id = randomUUID();
//   const b = { id, title, author };
//   map.set(id, b);
//   return b;
// }
// function update(id, { title, author = null }) {
//   const b = { id, title, author };
//   map.set(id, b);
//   return b;
// }
// function del(id) { return map.delete(id); }
// function exists(id) { return map.has(id); }

// export default { list, get, create, update, delete: del, exists };

export default { list, get, create, update, delete: del };
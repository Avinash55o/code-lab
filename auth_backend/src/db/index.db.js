let users=[];

function createUser(user){
    users.push(user);
    console.log("current user",users)
    return user;
}

function findUserbyname(name){
    return users.find(u=> u.name === name)
}

function findUserbyID(id){
    return users.find(u=>u.id===id)
}

console.log(users)

export  {createUser,findUserbyID,findUserbyname}
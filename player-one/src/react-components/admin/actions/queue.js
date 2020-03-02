// Methods in this file modifies the Queue component state

const log = console.log;

// Function to add a student, needs to be exported
export const addUser= queue => {
    log("adding Manager");
    log("queue " + queue.state.__proto__);
    const userList = queue.state.users;

    const user = {
        Username: queue.state.Username,
        password: queue.state.password
    };
    console.log("user list " + userList);


    userList.push(user);


    queue.setState({
        users:userList
    });
};

export const removeUser = (queue, user) => {
    const filteredUsers = queue.state.users.filter(s => {
        return s !== user;
    });

    queue.setState({
       users: filteredUsers
    });
};



export const updateUser = (queue, user) => {

    // filters out the student we don't want.
    const targetUser = queue.state.users.filter(s => {
    // const targetUser = queue.state.users.filter(s => {
        return s === user;
    });

    //log(filteredStudents)

    queue.setState({
        users: targetUser
    });
};

export const handleEvent = (event, queue)=> {
    let target = event.target;
    let value = target.value;
    const name = target.name;
    console.log("target" + target);
    let selectedName = target.parentElement.firstElementChild;
    let newText = document.createElement("Input");
    newText.id = "inputId";

    target = target.replaceWith('newText');
    value = document.getElementById("inputId").value;

    queue.setState({
        [name]: value
    });


}


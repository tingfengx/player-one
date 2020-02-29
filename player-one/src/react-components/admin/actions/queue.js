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

class Users {

    constructor () {
        this.users = [];

}

    addUser(socketId, name, roomName) {
        let user = {
          socketId,
          name,
          roomName
        };

        this.users.push(user);
        return user
    }

    removeUser (socketId) {
        //return user that was removed

        if (typeof socketId === "string") {
            let filteredUsers = this.users.filter((user) => user.socketId !== socketId); //creates array of users not having that id

            let removedUser = this.users.filter((user) => user.socketId === socketId); //creates array of user of that id

            this.users = filteredUsers;
            return removedUser[0];
        }else{
            return undefined;
        }


    }

    getUser (socketId) {
        if (typeof socketId === "string") {
            // let filteredUsers = this.users.filter((user) => user.socketId !== socketId); //creates array of users not having that id

            let foundUser = this.users.filter((user) => user.socketId === socketId); //creates array of user of that id

            return foundUser[0];
        }else{
            return undefined;
        }

    }

    getUserList (roomName) {
        let users = this.users.filter((user) => user.roomName === roomName);

        let namesArray = users.map((user) => user.name);

        return namesArray;
    }


}

module.exports = {
    Users
};

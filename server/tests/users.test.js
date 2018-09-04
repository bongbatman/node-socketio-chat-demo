const {Users} = require('../utils/users');



describe('users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
           socketId: "a",
           name: "Mike",
           roomName: "Node Course"
        },
            {
                socketId: "b",
                name: "Andrew",
                roomName: "C++ Course"
            },
            {
                socketId: "c",
                name: "Hannah",
                roomName: "Node Course"
            }];


    });


    it('should add new user', function () {

        users = new Users();

        let user = {
          socketId: 123,
          name: "Billa Mama",
          roomName: "Mera Ghar"
        };

        let resUser = users.addUser(user.socketId, user.name, user.roomName);

        expect(users.users).toEqual([user]);
        expect(resUser).toStrictEqual(user);

    });

    it('should return names for node course', function () {

        let userList = users.getUserList("Node Course");

        expect(userList).toEqual(['Mike', 'Hannah'])
    });

    it('should remove a user', function () {

        let removedUser = users.removeUser("a");
        let userList = users.getUserList("Node Course");

        expect(removedUser.name).toBe('Mike');
        expect(userList).toEqual(['Hannah']);

    });

    it('should not remove a user if id is wrong', function () {
        let removedUser = users.removeUser(43);
        let userList = users.getUserList("Node Course");

        expect(removedUser).toBeUndefined();
        expect(userList).toEqual(['Mike','Hannah']);
    });

    it('should find a user', function () {
        let foundUser = users.getUser("a");

        expect(foundUser.name).toBe('Mike');

    });

    it('should not find user if id is wrong', function () {

        let foundUser = users.getUser(3);

        expect(foundUser).toBeUndefined();
    });

});
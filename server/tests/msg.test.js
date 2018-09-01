let {generateMsg} = require('../utils/msg');

describe('Generate Message', () => {

    it('should generate new message', function () {

        // generateMsg = jest.fn();

        let msg = {
            from: "test case",
            text: "This is a test msg"
        };

        let returnedMsg = generateMsg(msg.from, msg.text);

        // expect(generateMsg).toHaveBeenCalledWith(msg.from, msg.text);
        // expect(generateMsg).toHaveReturnedWith(returnedMsg);
        expect(returnedMsg).toMatchObject(msg);
        // expect(returnedMsg.text).toBe(msg.text);
        // expect(returnedMsg.from).toBe(msg.from);
        // expect(typeof returnedMsg.createdAt).toBe(typeof 90);

    });

});

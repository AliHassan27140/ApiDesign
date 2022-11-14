import * as user from '../user';

describe('user Handler', () => {
   it('it should create a new user', async ()=>{
    const req = {body: {username: 'hello', password: 1}}
    const res = {json({token}) { 
        expect(token).toBeTruthy()
    }}

     await user.createNewUser(req, res, ()=>{})
   })
})
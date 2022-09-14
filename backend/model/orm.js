import { getUser, createUser, deleteUser, updateUserInfo } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(name, info) {
    try {
        let isInDb = (await getUser({ name })).length == 1 
        if (isInDb) {
            throw new Error("Duplicate user")
        }
        const newUser = await createUser({ name, info});
        newUser.save();
        return newUser;
    } catch (err) {
        // console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormDeleteUser(name) {
    try {
        let notInDb = (await getUser({ name })).length == 0
        if (notInDb) {
            throw new Error("User does not exist")
        }
        await deleteUser({name});
        return true;
    } catch (err) {
        // console.log('ERROR: Could not delete user');
        return { err };
    }
}

export async function ormUpdateUserInfo(name, info) {
    try {
        let notInDb = (await getUser({ name })).length == 0
        if (notInDb) {
            throw new Error("User does not exist")
        }
        await updateUserInfo({name}, {info});
        return true;
    } catch (err) {
        // console.log('ERROR: Could not update user');
        return { err };
    }
}

export async function ormGetUser(name) {
    let user = await getUser({ name })
    return user[0]
}

export async function ormGetAllUsers() {
    return await getUser({})
}
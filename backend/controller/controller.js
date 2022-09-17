import { 
    ormCreateUser,
    ormDeleteUser,
    ormGetAllUsers,
    ormGetUser,
    ormUpdateUserInfo
} from '../model/orm.js'

export async function createUser(req, res) {
    try {
        const name = req.body.name?.trim();
        const info = req.body.info?.trim();
        if (name && info) {
            const resp = await ormCreateUser(name, info);
            if (resp.err) {
                return res.status(422).json({message: 'User already exists!'});
            } else {
                return res.status(200).json({message: `Created new user ${name} successfully!`, data: {name, info}});
            }
        } else {
            return res.status(400).json({message: 'name and/or info are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function getUser(req, res) {
    try {
        const name = req.query.name?.trim();
        if (name) {
            const resp = await ormGetUser(name);
            if (resp) {
                return res.status(200).json({message: `Queried user ${name} successfully!`, data: resp});
            } else {
                return res.status(404).json({message: 'Could not find user!'});
            }
        } else {
            return res.status(400).json({message: 'name is missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function getAllUsers(req, res) {
    try {
        const resp = await ormGetAllUsers();
        return res.status(200).json({message: `Queried all users successfully!`, data: resp});
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function deleteUser(req, res) {
    try {
        const name = req.body.name?.trim();
        if (name) {
            const resp = await ormDeleteUser(name);
            if (resp.err) {
                return res.status(404).json({message: 'User not found! Could not delete user!'});
            } else {
                return res.status(200).json({message: `Deleted user ${name} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'name is missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function updateUser(req, res) {
    try {
        const name = req.body.name?.trim();
        const info = req.body.info?.trim();
        if (name && info) {
            const resp = await ormUpdateUserInfo(name, info);
            if (resp.err) {
                return res.status(404).json({message: 'User not found! Could not update user info!'});
            } else {
                return res.status(200).json({message: `Update user ${name}'s info successfully!`});
            }
        } else {
            return res.status(400).json({message: 'name and/or info are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when updating user!'})
    }
}

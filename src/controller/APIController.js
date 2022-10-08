import connection from "../configs/connectDB";

let getAllUser = async(req, res) => {
    const [rows] = await connection.execute('SELECT * FROM user ');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let getCreateUser = async (req,res) =>{
    let { fname, lname, email, address } = req.body;

    if(!fname || !lname || !email || !address){
        return res.status(200).json({
            message: 'missing required params', 
        })
    }

    await connection.execute('INSERT INTO user(firstName,lastName,email,address) VALUES(?,?,?,?)', [fname, lname, email, address]);
    
    return res.status(200).json({
        message: 'ok', 
    })
}

let getUpdateUser = async (req,res) =>{
    let { fname, lname, email, address ,id} = req.body;

    if(!fname || !lname || !email || !address || !id){
        return res.status(200).json({
            message: 'missing required params', 
        })
    }

    await connection.execute('update user set firstName= ?, lastName = ? , email = ? , address= ? where id = ?', [fname, lname, email, address,id]);

    return res.status(200).json({
        message: 'ok', 
    })
}

let getDeleteUser = async (req,res) =>{
    let iduser = req.params.id;
    if (!iduser) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await connection.execute('delete from user where id = ?', [iduser]);

    return res.status(200).json({
        message: 'ok', 
    })
}


module.exports = {
    getAllUser,
    getCreateUser,
    getUpdateUser,
    getDeleteUser
}
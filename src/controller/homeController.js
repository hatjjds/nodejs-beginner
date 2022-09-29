import connection from "../configs/connectDB";


let getHomePage = async (req, res) => {

    const [rows, fields] = await connection.execute('SELECT * FROM `user` ');
    console.log(rows);
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res)=>{
    let userId=req.params.userId;
    const [user, fields] = await connection.execute('SELECT * FROM `user` WHERE `id` = ?', [userId]);
    // console.log(user);
    return res.send(user)
}

module.exports = {
    getHomePage,
    getDetailPage
}
import connection from "../configs/connectDB";


let getHomePage = async (req, res) => {
    const [rows] = await connection.execute('SELECT * FROM user ');
    // console.log(rows);
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [userId]);
    // console.log(user);
    return res.send(user)
}

let getCreateUserPage = async (req, res) => {
    // console.log(req.body);
    let {fname,lname,email,address}=req.body;
    await connection.execute('INSERT INTO user(firstName,lastName,email,address) VALUES(?,?,?,?)',[fname,lname,email,address]);
    return res.redirect('/');
}

let getDeletePage = async (req, res) => {
    let iduser=req.params.Iduser;
    await connection.execute('delete from user where id = ?', [iduser]);
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailPage,
    getCreateUserPage,
    getDeletePage
}
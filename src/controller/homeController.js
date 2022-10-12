import connection from "../configs/connectDB";
import multer from 'multer';

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
    let { fname, lname, email, address } = req.body;
    await connection.execute('INSERT INTO user(firstName,lastName,email,address) VALUES(?,?,?,?)', [fname, lname, email, address]);
    return res.redirect('/');
}

let getDeletePage = async (req, res) => {
    let iduser = req.body.Iduser;
    // console.log(iduser);
    await connection.execute('delete from user where id = ?', [iduser]);
    return res.redirect('/');
}

let getEditUserPage = async (req, res) => {
    let userid = req.params.id;
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [userid]);
    return res.render('update.ejs', { dataUser: user[0] })
}

let getUpdateUserPage = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await connection.execute('update user set firstName= ?, lastName = ? , email = ? , address= ? where id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let getUploadFile = async (req, res) => {
    return res.render('uploadFile.ejs');
}

const upload = multer().single('profile_pic');
let getUploadProfilePic = async (req, res) => {

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const uploadMutiple = multer().array('multiple_images',10);
let getUploadMutiplePic = async (req, res) => {

    uploadMutiple(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    })
}

module.exports = {
    getHomePage,
    getDetailPage,
    getCreateUserPage,
    getDeletePage,
    getEditUserPage,
    getUpdateUserPage,
    getUploadFile,
    getUploadProfilePic,
    getUploadMutiplePic
}
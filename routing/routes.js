const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<form action="update" method="post" enctype="multipart/form-data">'
    );
    res.write('<input type="file" name="avatar"><br>');
    res.write('<input type="text" name="lastName"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
  if (url === '/update' && method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      const originalFilename = files.avatar.originalFilename;

      let avatarName;
      if (!fields.lastName) {
        avatarName = originalFilename;
      } else {
        const hyphenatedName = fields.lastName
          .replace(/\s+/g, '-')
          .toLowerCase();
        avatarName = hyphenatedName + '.' + originalFilename.split('.')[1];
      }

      const oldPath = files.avatar.filepath;
      const newPath = path.join(__dirname, 'uploads') + '/' + avatarName;

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        res.write('File uploaded!');
        res.end();
      });
    });
  }
};

exports.handler = requestHandler;

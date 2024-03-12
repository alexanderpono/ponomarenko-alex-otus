import { File } from '../models/File';

function get(req, res, next) {
    File.find({})
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
}

module.exports = {
    get
};

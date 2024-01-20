var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('get lesson');
});
router.post('/', function (req, res, next) {
    res.send('post lesson');
});

router.get('/:id', function (req, res, next) {
    res.send('get lesson ' + req.params.id);
});
router.put('/:id', function (req, res, next) {
    res.send('put lesson ' + req.params.id);
});
router.delete('/:id', function (req, res, next) {
    res.send('delete lesson ' + req.params.id);
});

router.get('/:id/file', function (req, res, next) {
    res.send('get files for lesson' + req.params.id);
});
router.post('/:id/file', function (req, res, next) {
    res.send('post file for lesson' + req.params.id);
});

router.get('/:id/file/:fileid', function (req, res, next) {
    res.send('get file' + req.params.fileid + 'for lesson' + req.params.id);
});
router.put('/:id/file/:fileid', function (req, res, next) {
    res.send('put file' + req.params.fileid + 'for lesson' + req.params.id);
});
router.delete('/:id/file/:fileid', function (req, res, next) {
    res.send('delete file ' + req.params.fileid + 'for lesson' + req.params.id);
});

router.get('/:id/video', function (req, res, next) {
    res.send('get videos for lesson' + req.params.id);
});
router.post('/:id/video', function (req, res, next) {
    res.send('post video for lesson' + req.params.id);
});

router.get('/:id/video/:videoid', function (req, res, next) {
    res.send('get video' + req.params.videoid + 'for lesson' + req.params.id);
});
router.put('/:id/video/:videoid', function (req, res, next) {
    res.send('put video' + req.params.videoid + 'for lesson' + req.params.id);
});
router.delete('/:id/video/:videoid', function (req, res, next) {
    res.send('delete video' + req.params.videoid + 'for lesson' + req.params.id);
});

router.get('/:id/comment', function (req, res, next) {
    res.send('get comments for lesson' + req.params.id);
});
router.post('/:id/comment', function (req, res, next) {
    res.send('post comment for lesson' + req.params.id);
});

router.get('/:id/comment/:commentid', function (req, res, next) {
    res.send('get comment' + req.params.commentid + 'for lesson' + req.params.id);
});
router.put('/:id/comment/:commentid', function (req, res, next) {
    res.send('put comment' + req.params.commentid + 'for lesson' + req.params.id);
});
router.delete('/:id/comment/:commentid', function (req, res, next) {
    res.send('delete comment' + req.params.commentid + 'for lesson' + req.params.id);
});

router.get('/:id/rate', function (req, res, next) {
    res.send('get rates for lesson' + req.params.id);
});
router.post('/:id/rate', function (req, res, next) {
    res.send('post rate for lesson' + req.params.id);
});

router.get('/:id/rate/:rateid', function (req, res, next) {
    res.send('get rate' + req.params.rateid + 'for lesson' + req.params.id);
});
router.put('/:id/rate/:rateid', function (req, res, next) {
    res.send('put rate' + req.params.rateid + 'for lesson' + req.params.id);
});
router.delete('/:id/rate/:rateid', function (req, res, next) {
    res.send('delete rate' + req.params.rateid + 'for lesson' + req.params.id);
});

module.exports = router;

var express = require('express');
var router = express.Router();


// router.use("/vietnamwork", require(__dirname + "/vietnam_work"))
router.use("/muasamcong", require(__dirname + "/muasamcong"))


router.get('/', async (req, res) => {
    res.render("index", { title: "Crawl Other" });
});

module.exports = router;


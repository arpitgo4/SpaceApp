

const router = require('express').Router();

const users_data = require('../db/user');

router.get('/', (req, res) => {
    res.status(200).json({
        "sys": {
            "type": "Array"
        },
        "total": 1,
        "skip": 0,
        "limit": 100,
        "items": users_data
    });
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    const user = users_data.find(user => user.sys.id === userId);
    if (user)
        res.status(200).json(user);
    else res.status(404).json({ message: 'User not found' });
});



module.exports = router;


const router = require('express').Router();

const {
    spaces_data,
    assets_data,
    entries_data,
} = require('../db/space');

router.get('/', (req, res) => {
    res.status(200).json({
        "sys": {
            "type": "Array"
        },
        "total": 3,
        "skip": 0,
        "limit": 100,
        items: spaces_data
    });
});


router.get('/:spaceId', (req, res) => {
    const { spaceId } = req.params;

    const space = spaces_data.find(space => space.sys.id === spaceId);
    if (space)
        res.status(200).json(space);
    else res.status(404).json({ message: 'Space not found' });
});

router.get('/:spaceId/assets', (req, res) => {
    const { spaceId } = req.params;

    const space = spaces_data.find(space => space.sys.id === spaceId);
    if (!space)
        return res.status(404).json({ message: 'Space not found' });

    const assets = assets_data.filter(asset => asset.sys.space === spaceId);

    res.status(200).json({
        "sys": {
            "type": "Array"
        },
        "total": 3,
        "skip": 0,
        "limit": 100,
        items: assets
    });
});

router.get('/:spaceId/assets/:assetId', (req, res) => {
    const { spaceId, assetId } = req.params;

    const space = spaces_data.find(space => space.sys.id === spaceId);
    if (!space)
        return res.status(404).json({ message: 'Space not found' });

    const asset = assets_data.find(asset => asset.sys.id === assetId && asset.sys.space === spaceId);

    if (asset)
        res.status(200).json(asset);
    else res.status(404).json({ message: 'Asset not found' });
});

router.get('/:spaceId/entries', (req, res) => {
    const { spaceId } = req.params;
 
    const space = spaces_data.find(space => space.sys.id === spaceId);
    if (!space)
        return res.status(404).json({ message: 'Space not found' });

    const entries = entries_data.filter(entry => entry.sys.space === spaceId);

    res.status(200).json({
        "sys": {
            "type": "Array"
        },
        "total": 3,
        "skip": 0,
        "limit": 100,
        items: entries
    });
});


router.get('/:spaceId/entries/:entryId', (req, res) => {
    const { spaceId, entryId } = req.params;

    const space = spaces_data.find(space => space.sys.id === spaceId);
    if (!space)
        return res.status(404).json({ message: 'Space not found' });

    const entry = entries_data.find(entry => entry.sys.id === entryId && entry.sys.space === spaceId);

    if (entry)
        res.status(200).json(entry);
    else res.status(404).json({ message: 'Entry not found' });
});

module.exports = router;
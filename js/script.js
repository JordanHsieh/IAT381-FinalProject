
var feed = new Instafeed({
    get: 'tagged',
    tagName: 'dogs',
    clientId: 'fce183d2bec14a6da70e5f84e17c5673',
    sortBy: 'random',
    resolution: 'low_resolution'
});
feed.run();
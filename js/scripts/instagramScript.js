
// var feed = new Instafeed({
//     get: 'tagged',
//     tagName: 'joke', 
//     clientId: 'fce183d2bec14a6da70e5f84e17c5673',
//     sortBy: 'random',
//     resolution: 'standard_resolution',
//     limit: 1
// });
// feed.run();

var feed = new Instafeed({
    get: 'user',
    userId: 179801071,
    clientId: 'fce183d2bec14a6da70e5f84e17c5673',
    accessToken: '279099123.1677ed0.6d26ad5ce9ea452ab09bca632be5bdb6',
    sortBy: 'random',
    resolution: 'thumbnail',
    limit: 1
});
feed.run();

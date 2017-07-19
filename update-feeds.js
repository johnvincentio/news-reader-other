// var crontab = require('node-crontab');
// var jobId = crontab.scheduleJob("*/2 * * * *", function() { // This will call this function every 2 minutes
//     console.log("Current timestamp "+new Date().toISOString());
// });


const mongoose = require('mongoose');


const {logger} = require('./config/logger');

const {DATABASE_URL} = require('./config/config');

/**
 * @const SubscriptionModel
 * @description Mongoose Model of a Mongo collection Subscription
 */
const {SubscriptionModel} = require('./api/subscription/subscription.model');

/** Module for getting a RSS Feed */
const RssFeeder = require('./api/rss/rss.feeder');
let rssFeeder = new RssFeeder();

/** Module for getting various RSS utility methods */

const RssUtils = require('./api/rss/rss.utils');
let rssUtils = new RssUtils();

mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

const SubscriptionAccess = require('./api/subscription/subscription.access');
let subscriptionAccess = new SubscriptionAccess();

// db.on("error", console.error.bind(console, "connection error"));

/*
Promise.all([
    userAccess.getById(req.user.id),
    subscriptionAccess.getOneSubscription(channel_url)])
.then(values => {
    let _user = values[0];
    let _subscription = values[1];

})
.catch(err => {
    logger.error(err);
    res.status(500).json({message: 'Internal Server error'});
});
*/

var myfunc = function getById(item) {
    return new Promise(
        function(resolve, reject) {
            logger.info('Found subscription: Id %d Url %s', item._id, item.url);
            rssFeeder.promisedGetFeed(item.url)
            .then((json) => rssUtils.transform(json))
            .then(obj => {
                SubscriptionModel.findByIdAndUpdate(item._id,
                    {$set: {channel: obj.channel, items: obj.items}},
                    {$upsert: true})
                .exec()
                .then((doc2)=> {
                    logger.info('Subscription updated: Id %d Url %s', doc2._id, doc2.url);
                    resolve('Subscription updated: Id %d Url %s', doc2._id, doc2.url);
                })
                .catch(err => {
                    logger.error('**** Update Error; Reason '+err);
                    reject('**** Update Error; Reason '+err);
                });
            })
            .catch(function(err) {
                logger.error('Error on Parse to json; id %d, Url %s, Reason: %s', item._id, item.url, err);
                reject('Rejected; Error on Parse to json; id '+item._id+', Url '+item.url+', Reason: '+err);
            });
        });
};

var req1 = new Promise(function(resolve, reject) {
    logger.info('>>> req1');
    // A mock async action using setTimeout
    setTimeout(function() {
        logger.info('in req1');
        resolve('First!');
    }, 4000);
    logger.info('<<< req1');
});

db.on("error", console.error.bind(logger.error, "Update Feeds; Connection Error"));
db.once("open", function() {
    logger.info("Update Feeds; Connection succeeded.");
    subscriptionAccess.getAllSubscriptions()
    .then(items => {
//         let promises = [];
//         items.forEach((item) => {
//             logger.info('Found subscription: Id %d Url %s', item._id, item.url);
// //            let jv = rssUtils.makePromise(item);
// //            promises.push(req1);

// //            var req4 = getById(item);
//  //           promises.push(req4);

//             logger.info("after promises push");
//         });
        // const jv = items.map(function(obj) {
        //     console.log("obj._id "+obj._id);
        //     console.log("obj.url "+obj.url);
        //     return getById(obj);
        // });

        const jv = items.map(myfunc);

        logger.info("done making array of promises");
        return jv;
//        return promises;
    })
    .then(promises => {
        Promise.all([promises]).then(function(results) {
            console.log('Then: ', results);
            for (const text of results) {
                console.log(text);
            }
            logger.info('all promises done');
            logger.info("done executing promises");
        })
        .catch(err => {
            console.log('Catch: ', err);
            logger.error('Update Feeds; Error '+err);
        });
    })
    .catch(err => {
        console.log('Catch: ', err);
        logger.error('Update Feeds; Error '+err);
    });

//        rssUtils.test_all(items);
});

/*
        Promise.all([
            userAccess.getById(req.user.id),
            subscriptionAccess.getOneSubscription(channel_url)])
        .then(values => {
*/
/*
        subscriptionAccess.getAllSubscriptions()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
*/

/*
    .then(promises => {
        Promise.all([promises]);
    })
    .then(results => {
        console.log('Then: ', results);
        logger.info('all promises done');
    })
    .catch(err => {
        console.log('Catch: ', err);
        logger.error('Update Feeds; Error '+err);
    });
*/

            // var req2 = new Promise(function(resolve, reject) {
            //     logger.info('>>> req2');
            //     // A mock async action using setTimeout
            //     setTimeout(function() {
            //         logger.info('in req2');
            //         resolve('second!');
            //     }, 3000);
            //     logger.info('<<< req2');
            // });
            // promises.push(req2);

            // var req3 = new Promise(function(resolve, reject) {
            //     logger.info('Found subscription: Id %d Url %s', item._id, item.url);
            //     rssFeeder.promisedGetFeed(item.url)
            //     .then((json) => {
            //         let obj = rssUtils.transform(json);
            //         SubscriptionModel.findByIdAndUpdate(item._id,
            //             {$set: {channel: obj.channel, items: obj.items}},
            //             {$upsert: true})
            //         .exec()
            //         .then((doc2)=> {
            //             logger.info('Subscription updated: Id %d Url %s', doc2._id, doc2.url);
            //             resolve('Subscription updated: Id %d Url %s', doc2._id, doc2.url);
            //         })
            //         .catch(err => {
            //             logger.error('**** Update Error; Reason '+err);
            //             reject('**** Update Error; Reason '+err);
            //         });
            //     })
            //     .catch(function(err) {
            //         logger.error('Error on Parse to json; id %d, Url %s, Reason: %s', item._id, item.url, err);
            //         reject('Rejected; Error on Parse to json; id '+item._id+', Url '+item.url+', Reason: '+err);
            //     });
            // });
            // promises.push(req3);

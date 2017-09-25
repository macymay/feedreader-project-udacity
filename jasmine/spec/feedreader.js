/* This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* All tests are placed within the $() function because some
 * of these tests may require DOM elements.
 */
$(function() {

    /* This test suite pertains to the RSS feeds definitions,
     * the allFeeds variable.
     */
    describe('RSS Feeds', function() {

        /* This test makes sure that allFeeds has been defined & that its not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and ensures
         * it has a url defined & that url is not empty.
         */
        it('has url', function() {
            // first looped through each feed in allFeeds object,
            for (var x in allFeeds) {
                // ensures it has a url defined,
                expect(allFeeds[x].url).toBeDefined();
                // and that the url is not empty.
                expect(allFeeds[x].url).not.toBe('');
            }

        });

        /* This test loops through each feed in the allFeeds object and ensures
         * it has a name defined & that name is not empty.
         */
        it('has name', function() {
            // first looped through each feed in allFeeds object,
            for (var x in allFeeds) {
                // ensures it has a name defined,
                expect(allFeeds[x].name).toBeDefined();
                // and that the name is not empty.
                expect(allFeeds[x].name).not.toBe('');
            }

        });

        // End of describing RSS Feeds test suite.
    });


    /* This test suite pertains to The menu part of the page that comes in from
     * the left-hand side of the screen.
     */
    describe('The menu', function() {

        /* This test ensures The menu element is hidden by default.
         */
        it('is hidden initially', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures The menu changes visibility when clicked.
         * The menu displays when clicked and disappears when clicked again.
         */
        it('displays when clicked and disappears when clicked again', function() {
            // if the hamburger menu icon is clicked, expect the menu to appear.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            // if the icon is clicked again, expect the menu to be hidden.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // End of describing The menu test suite.
    });


    // ASYNCHRONOUS functionality required - - - loadfeed() is asynchronous;
    /* This test suite pertains to the Initial Entries within the .feed container.
     */
    describe('Initial Entries', function() {

        /* added a beforeEach function and passed 'done' to the callback for
         * asynchronous functionality.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that when the loadFeed function is called & completes
         * its work, there is a single .entry element within the .feed container
         * at the very least.
         */
        it('once loaded, shows an entry', function() {
            expect($('.feed').find('.entry').length).not.toBe(0);
        });

        // End of describing Initial Entries test suite.
    });


    // ASYNCHRONOUS functionality required;
    /* This test suite pertains to the New Feed Selection that is loaded by
     * the loadFeed function.
     */
    describe('New Feed Selection', function() {

        // declared newFeed variable that is used to gauge whether new feeds are loaded
        var newFeed;

        /* added a beforeEach function and passed 'done' to the callback for
         * asynchronous functionality as well as set newFeed variable equal to .feed
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                newFeed = $('.feed').html();

                loadFeed(1, done);
            });
        });

        /* This test ensures that when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it('should change content once a new feed is loaded', function(done) {
            expect($('.feed').html()).not.toEqual(newFeed);
            done();
        });

        // End of describing New Feed Selection test suite.
    });

    // End of entire $() function.
}());

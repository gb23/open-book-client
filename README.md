Note: this is the client-side repository for Card Comp.  The repository for the API can be found [here](https://github.com/gb23/open-book-api).

# Card Composition Text Editor

Another text editor?? Ughhh.  Just hear me out!  Often a composition is easier to create when it is broken down into sections or cards.  For instance, creating content in a tweet is often easier than doing so within a daunting, largely empty page of a word processor. Breaking a composition into cards allows for easy collaboration with others.  Authors can new versions of a card until they are happy with it.  

**How quickly would a quality crowdsourced story be created?** If many people wrote just a card or two, and only the highest voted cards appeared in the final composition, I hypothesize the final story would be compelling and unique.

## Navigation               
Navigation through cards is easy: use the arrow keys on the keyboard to move up, down, left, or right. As we further create new content for a composition, we create new cards, and the composition grows in the downward direction. Simple. (Just like writing a letter, as you write more and more, the content grows in a downward direction.) We use the down arrow to move down to the next card.  Similarly the up arrow will move to the previous card in the composition.

Here's where breaking down text into cards really comes in handy:  We can navigate through cards in the horizontal direction as well.  The cards in a given row are meant to be different versions of how author(s) would want to continue the text from the cards above it.  Let's say I'm not happy with the writing style or content on a card and want to look at other versions I may have created.  You can arrow through different versions of text using the right and left arrow keys.  Want to create a new version?  Arrow over in the horizontal direction until a 'add version' card appears.  Type in it and submit.

For a clearer understanding of how Card Comp works, run the program in your browser.  The landing page is a sandboxed tutorial to play around in.  Then when you are finished, create a composition for people to vote on!
                
## Usage

Fork these repositories to your own account:

- https://github.com/gb23/open-book-client
- https://github.com/gb23/open-book-api

Then clone the repositories to your local environment

After forking and cloning the repos, setup the database (PostgreSQL), run migrations, seed the database, and have the server run on localhost:3001 with the following command (in the `open-book-api` repo):

`createdb open-book-api_development && rake db:migrate && rake db:seed && rails s -p 3001`

Now navigate to localhost:3001 in your browser.

In the `open-book-client` repo run `bundle install` to install Ruby gem dependencies.  Then run the command `npm start`.

## Contributing

Bug reports and pull requests are welcome on GitHub at either the Open Book client or Open Book API.

## License

The app is available as open source under the terms of the MIT License.
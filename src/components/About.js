import React from 'react';

const About = () => {
    return (
        <div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                Welcome to Card Comp! Sometimes a composition is easier to create when it is broken down into
                sections or cards.  Think about how tweeting can sometimes easier than sitting down at a word processor and typing.  
                That's the idea with Card Comp, but there's more to it!  With Card Comp, your cards are voted on.  The result is a composition
                that consists of only the best possible cards. More on this later... Let's first go over the basics.
                
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                Oh look we are on a new card now!  In the real Card Comp composer, we navigate to a card below with the down arrow key (or a click on the card).
                Similarly, an up arrow will navigate to a card above.  The idea is that as a composition grows, new cards are created, extending the composition
                downward.  (Just like typing on a normal text editor, as you type more and more, the text grows in a downward direction.)
        
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                A new concept in Card Comp: in addition to adding cards in the downward (column) direction, one can also create new cards
                at a given row (left/right). The text in a given row is meant to be a continuation of the text on the card above it.  In this manner,
                the cards in a given row are different versions of how one would want to continue the composition's text above it.  To navigate the 
                different versions in a row, use the left and right arrow keys. 
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                 Arrowing left or right on the very top text card will allow you to switch between different COMPOSITIONS.   
                 Arrowing left or right on any other text card will allow you to switch between different VERSIONS of that level within the composition.
                 To create a new composition, arrow either left or right on the top card until a card appears that allows you to type and submit.
                 To create a new version, arrow either left or right on any other text card until a card appears that allows you to type and submit.
                 To continue the composition with new content, that is, not another version of existing content, go to the card at the very bottom.  Type and submit.
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                 So now, back to voting.  Each card can be "liked" by clicking on a thumbs-up icon that is present in the bottom left (now shown).
                 This card has 1 vote. Cards are compared on a row by row basis; that is, the versions are compared with one another to find the most liked.
                 (The very top cards are the composition cards, so voting on the top card represents approval of the composition as a whole)
                 <div className="cardData" style={{marginTop: "60px"}}>
                    <a className="ml2 link dim blue" href="#0"><i className="fa fa-thumbs-up blue"  />1</a>
                    
                 </div> 
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                 As one navigates in the upward and downward direction, it is only the most-liked versions that are shown.  However, one can 
                 look at less popular versions, as mentioned before, with the left and right arrow keys.  If there is a tie between two cards
                 at a given row, the card that was created first is shown.
                 <div className="cardData" style={{marginTop: "80px"}}>
                    <a className="ml2 link dim blue" href="#0"><i className="fa fa-thumbs-up blue"  />0</a>
                    
                 </div>  
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                 Lastly, in the bottom righthand corner of a card is an indicator of where you presently are located in a given row (now shown).
                 This card has "2/4" which means you are currently on the second of four cards on that row.   Arrowing to the right would bring you to the next card
                 which would have "3/4" on it, while arrowing to the left would bring you to the card with "1/4" on it.  
                 <div className="cardData mt5">
                    <a className="ml2 link dim blue" href="#0"><i className="fa fa-thumbs-up blue"  />4</a>
                    <span className="mr2 blue">2/4</span>
                 </div>   
            </div>
            <div className="center SectionCard bt pt3 bb b--black-10">
                 So that's Card Comp in a nutshell.  It breaks down a composition into cards.  These cards can be thought of as growing in
                 an upsidedown tree-like structure: downward and outward.  Say goodbye to the torture of trying to create content to fill pages,
                 and say hello to simply typing on one card at a time! 
                 <div className="cardData" style={{marginTop: "75px"}}>
                    <a className="ml2 link dim blue" href="#0"><i className="fa fa-thumbs-up blue"  />2</a>
                    <span className="mr2 blue">1/3</span>
                 </div>
            </div>



        </div>
    );
    
}

export default About;
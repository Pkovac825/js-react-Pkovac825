import React from 'react';
import { observer } from 'mobx-react';
import { OneWishInfo } from './OneWishInfo'
import styles from './Wishlist.module.css';
import { useSetState } from 'react-use';

function WishlistComponent(props) {
    const { wishlist, flights } = props;
    const [state, setState] = useSetState({
        itemsToShow: 4,
        expanded: false,
    });

    function showMore() {
        state.itemsToShow === 4 ? (
          setState({ itemsToShow: wishlist.length, expanded: true })
        ) : (
          setState({ itemsToShow: 4, expanded: false })
        )
      }


    return (
        <>
            <div className={styles.main}>
                <p><span className={styles.bigText}>WISHLIST</span>
                    {(wishlist.length > state.itemsToShow || state.expanded) && <a className={styles.expandable} onClick={showMore}>
                        {state.expanded ? (
                            <span>Show less</span>
                        ) : (
                            <span>Show more</span>
                        )} </a>}</p>

             {wishlist.length ?
                    <div className={styles.bookingGrid}>
                                {wishlist.slice(0, state.itemsToShow).map((wish) => (
                                    <OneWishInfo wish={wish} key={wish} flights={flights}/>
                                ))}
                                
                    </div>
                :
                <a className={styles.blueLink} href="/">Your wishlist is empty. Click here to find flights to add!</a>
            }


            </div>
        </>
    )

}

export const Wishlist = new observer(WishlistComponent);
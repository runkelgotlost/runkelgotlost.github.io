import React, {useState} from 'react'
import update from 'immutability-helper'

import {Item, Items} from "../../other";

interface LostItemProps {
    onChange: (items: Item[]) => void
}

export const LostItems = (props: LostItemProps) => {

    const [items, setItems] = useState<Item[]>(Items);

    const handleItemClick = (index: number) => {

        const newItems = update(items, {
            [index]: {
                lost: {
                    $set: !items[index].lost
                }
            }
        });


        setItems(newItems);

        props.onChange(newItems);
    };

    return(
        <div className="form-group">
            <div className="columns col-gapless">
                {items.map((item, index) => {
                    return (
                        <div className="column col-6">
                            <label className="form-checkbox form-inline" onClick={(event) => {
                                event.preventDefault();
                                handleItemClick(index)
                            }}>
                                <input type="checkbox" checked={!item.lost} /><i className="form-icon"></i> {item.title}
                            </label>
                            <br />
                        </div>
                    )
                })}
            </div>

        </div>
    )
};

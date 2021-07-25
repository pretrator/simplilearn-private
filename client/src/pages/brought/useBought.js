import { useEffect, useState } from 'react';
import { getItems, getBoughtItems } from '../../api/auth'

export const useBought = () => {
    const [items, setItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    useEffect(() => {
        getItems().then(items => setItems(items));
    },[]);

    useEffect(() => {
        getBoughtItems().then(items => setBoughtItems(items.courses || []));
    },[]);
    return {
        bought: boughtItems.map(courseid => items.find(simgleItem => simgleItem.id === courseid.toString())),
    };
};

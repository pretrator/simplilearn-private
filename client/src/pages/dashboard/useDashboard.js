import { useEffect, useState } from 'react';
import { getItems } from '../../api/auth'

export const useDashboard = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(items => setItems(items));
    },[]);

    return {
        items,
    };
};

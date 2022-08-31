import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

export default function  BackButton ({ match, destination }){
    const location = useLocation();

    useEffect(() => {
        const parentPath = location.pathname;
        console.log(parentPath)
        if (match.path === '/') {
            parentPath = `/${destination}`;
        } else {
            const arr = match.path.split('/');
            const currPage = arr[arr.length - 1];
            parentPath = arr
                .filter((item) => {
                    return item !== currPage;
                })
                .join('/');
        }


    },[])
 
    return (
        <Link to={location.pathname}>
            {match.path === '/'
                ? `<-- ${destination.charAt(0).toUpperCase() + destination.slice(1)}`
                : '<-- Back'}
        </Link>
    );
};


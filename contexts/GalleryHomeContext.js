import React, { createContext, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import config from '../helper/Config'


export const GalleryHomeContext = createContext();



// We wrap the provider in a nice little component
// which will hold the state and provide methods to
// update the state
function GalleryHomeProvider(props) {
    let galleryImages = null;
    galleryImages = useFetch(config.getImages(20));

    function reloadData() {
        console.log("reload");
        // galleryImages = useFetch(config.reloadImages(100));
    }

    const galleryContextValues = {
        galleryImages, reloadData
    };

    return <GalleryHomeContext.Provider value={galleryContextValues} {...props} />;
}

// Here we create a custom hook that allows us to consume
// the todo context
function useGalleryHomeContext() {
    return useContext(GalleryHomeContext);
}

export { GalleryHomeProvider, useGalleryHomeContext };
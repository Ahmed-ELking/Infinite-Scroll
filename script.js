

//Global variables
const imageContainer = document.getElementById( 'image-container' );
const loader = document.getElementById( 'loader' );
let totalImages = 0;
let ready = false;
let imagesLoaded = 0;

// Unsplash API
const accessKey = 'TjQWbCwCQl4JuJqDKbjNXMP4zfrHOnsqogPZT2nEUqw';
let imageLoadCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ accessKey }&count=${ imageLoadCount}`;

//Photos Array
let photosArray = [];

//Check if all photos has been loaded
const imageLoaded = () =>
{ 
    imagesLoaded++;
    if ( imagesLoaded === totalImages )
    { 
        ready = true;
        loader.hidden = true;
        imageLoadCount = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ accessKey }&count=${ imageLoadCount}`;
    }
}

//Helper function to set attributes on DOM elementS
const setAttrs = ( element, attributes ) =>
{
    for ( const key in attributes )
    { 
        element.setAttribute( key, attributes[ key ] );
    }
}

//Create elements for links & photos, add to DOM
const displayPhotos = () =>
{
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    //Run function for each photos in the photos array
    photosArray.forEach( ( photo ) =>
    {
        //Create <a> to link to Unsplash
        const item = document.createElement( 'a' );
        //Set attributes to <a> element
        setAttrs( item, {
            href: photo.links.html,
            target: '_blank',
        } );

        //Create <img> for photo
        const img = document.createElement( 'img' );
        //Set attributes to <img> element
        setAttrs( img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        } );

        //Event listener to check when each photo is finished loading
        img.addEventListener('load', imageLoaded)
        //Put <img> element inside <a> element
        item.append( img );
        //Put <a> element inside the imageContainer
        imageContainer.append( item );
    } );
}

//Get photos from the API
const getPhotos = async () =>
{ 
    try {
        const resp = await fetch( apiUrl );
        photosArray = await resp.json();
        displayPhotos();
    } catch (error) {
        alert( 'Something went wrong. Please try again' );
    }
}

// Check if the scrolling near to the bottom of the page , load more photos
window.addEventListener( 'scroll', () =>
{
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // if the user hasn't scrolled far enough (>100px to the end) & Loading count is complete(ready = true)
    if ( windowRelativeBottom < document.documentElement.clientHeight + 100 && ready )
    {
        ready = false;

        // let's add more photos
        getPhotos();
    }
})

//Onload
getPhotos();

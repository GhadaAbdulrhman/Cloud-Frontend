import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { makeStyles } from "@material-ui/styles";

const ProductViewer = (props) => {
  const classes = useStyles();
  const { img } = props;
  const images = [];

  if (img) {
    images.push({
      original: `data:image/jpeg;base64,${img}`,
      thumbnail: `data:image/jpeg;base64,${img}`,
    });
  }

  return (
    <ImageGallery
      items={images}
      additionalClass={classes.gallery}
      showPlayButton={false}
      thumbnailPosition={"bottom"}
      showNav={false}
      showFullscreenButton={true}
      showThumbnails={false}
    />
  );
};

export default ProductViewer;

const useStyles = makeStyles((theme) => ({
  gallery: {
    "& .image-gallery-thumbnails-container": {
      textAlign: "left",
    },
    "& .image-gallery-image": {
      objectFit: "contain",  
      maxHeight: "500px",  
    },
    "& .image-gallery-slides img": {
      maxHeight: "500px",  
    },
  },
}));

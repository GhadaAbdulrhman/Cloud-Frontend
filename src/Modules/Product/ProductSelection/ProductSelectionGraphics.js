import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
const ProductSelectionGraphics = ({ shirtGraphics, setShirtGraphics }) => {
  const [isEditing, setIsEditing] = useState(true);

  const imgs = [
    {
      src: "https://www.freepnglogos.com/uploads/adidas-logo-png-hd-17.png",
      alt: "Adidas",
      width: 100,
      height: 100,
    },
    {
      src: "https://branditechture.agency/brand-logos/wp-content/uploads/2022/06/Calvin-Klein-1024x768.jpg",
      alt: "Calvin Klein",
      width: 100,
      height: 100,
    },
    {
      src: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
      alt: "Nike",
      width: 100,
      height: 100,
    },
    {
      src: "https://logowik.com/content/uploads/images/731_poloralphlauren.jpg",
      alt: "Polo",
      width: 100,
      height: 100,
    },
  ];

  useEffect(() => {
    if (shirtGraphics.src) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [shirtGraphics]);

  return (
    <div className="mt-3">
      <h4>Graphics</h4>
      {isEditing && (
        <div className={styles.imgs_div}>
          {imgs.map((img) => {
            return (
              <div key={img.src} className={styles.img_div}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  onClick={(e) => setShirtGraphics(e.target)}
                />
              </div>
            );
          })}
        </div>
      )}
      {!isEditing && (
        <div>
          <div>
            <h4 className="mt-2">Added Graphics</h4>
            <img
              key={shirtGraphics.src}
              src={shirtGraphics.src}
              alt={shirtGraphics.alt}
              width={shirtGraphics.width}
              height={shirtGraphics.height}
              className="mt-3 mb-3"
            />
          </div>
          <div>
            <button className={styles.btn} onClick={() => setShirtGraphics({})}>
              Clear Graphic
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelectionGraphics;

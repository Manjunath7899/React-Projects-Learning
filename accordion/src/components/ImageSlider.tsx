import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

interface ImageSliderProps {
  url: string;
  page: number;
  limit: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  url,
  page,
  limit,
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, error, loading } = useFetch(
    `${url}?page=${page}&limit=${limit}`
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setImages(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevState) =>
        prevState === images.length - 1 ? 0 : prevState + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return <div>Loading please wait.....</div>;
  }

  if (error) {
    return <div>Error while loading the data: {error}</div>;
  }

  const handlePrevious = () => {
    setCurrentSlide((prevState) =>
      prevState === 0 ? images.length - 1 : prevState - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevState) =>
      prevState === images.length - 1 ? 0 : prevState + 1
    );
  };

  const handleCurrentSlide = (currentIndex: number) => {
    setCurrentSlide(currentIndex);
  };

  return (
    <div style={styles.container}>
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        style={{ ...styles.arrow, ...styles.arrowLeft }}
        size={30}
      />
      {images &&
        images.length > 0 &&
        images.map((imageItem, index) => {
          return (
            index === currentSlide && (
              <img
                style={styles.currentImage}
                key={imageItem.id}
                src={imageItem.download_url}
                alt={imageItem.download_url}
              />
            )
          );
        })}
      <BsArrowRightCircleFill
        onClick={handleNext}
        style={{ ...styles.arrow, ...styles.arrowRight }}
        size={30}
      />
      <span style={{ position: "absolute", bottom: "15%" }}>
        {images &&
          images.length > 0 &&
          images.map((_, index) => {
            return (
              <button
                onClick={() => handleCurrentSlide(index)}
                key={index}
                style={
                  index === currentSlide
                    ? { ...styles.checkCircle, backgroundColor: "#fff" }
                    : { ...styles.checkCircle, backgroundColor: "grey" }
                }
              ></button>
            );
          })}
      </span>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    height: 600,
    width: 600,
    margin: "0 auto",
  },
  currentImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    objectFit: "cover",
  },

  arrow: {
    position: "absolute",
    cursor: "pointer",
    color: "#fff",
  },

  arrowLeft: {
    left: 10,
    top: "50%",
  },

  arrowRight: {
    right: 10,
    top: "50%",
  },

  checkCircle: {
    width: 20,
    height: 20,
    cursor: "pointer",
    color: "#ffffff",
    borderRadius: "50%",
    border: "none",
    outline: "none",
    margin: "0 5px",
  },
};

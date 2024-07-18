import React, { useState } from "react";

const images = [
  {
    src: "/icerikler/red.mp4",
    text: "Bu içerik kilitli değil. Kilitli içerikleri açmak için abone olun.",
  },
  {
    src: "/icerikler/1.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/2.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/3.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/4.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/5.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/6.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/7.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/8.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/9.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/10.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/11.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/12.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/13.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/14.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/15.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/16.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/17.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/18.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  ,
  {
    src: "/icerikler/19.png",
    text: "Bu video kilitli. Tüm videoları izlemek ve Zlata ile arkadaş olmak için abone olun",
    sansur: true,
  },
  // other image objects...
];

const isVideo = (src) => {
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((ext) => src.endsWith(ext));
};

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const nextImage = () => {
    setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  return (
    <div className="!bg-white">
      <div className="pfoil mb-16">
        <img src="/pro.png" alt="" />
        <h2 className="text-3xl my-5">Zlata Abid</h2>
        <p className=" p-2">
          Türkçe: Bana destek olanlara telefon numaramı veriyorum ve arkadaş
          oluyorum. Aşağıdaki videolarımı keyifle izleyin 💋
        </p>
        <p className="p-2">
          Ukrain: Я даю свій номер телефону тим, хто мене підтримує і друзям Я
          є. Насолоджуйтесь моїми відео нижче 💋
        </p>
      </div>
      <div>
        <div className="gallery">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative gallery-item `}
              onClick={() => openModal(index)}
            >
              {isVideo(image.src) ? (
                <video
                  className={`${
                    image.sansur ? "sansur" : ""
                  } max-h-[500px] w-full`}
                  controls
                  muted
                >
                  <source src={image.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={image.src}
                  className={`${
                    image.sansur ? "sansur" : ""
                  } w-[300px] !h-[500px]`}
                  alt={image.text}
                />
              )}
              <p
                className={`absolute z-40 text-white top-1/2 left-1/2 -translate-x-[75px] -translate-y-[27px]  w-[150px] p-2 py-4 
               leading-6 text-center  rounded bg-black ${
                 image.sansur ? "block" : "hidden"
               }`}
              >
                GÖRMEK İÇİN TIKLA
              </p>
            </div>
          ))}
        </div>

        {isOpen && (
          <div id="modal" className="modal" style={{ display: "block" }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
              <div className="modal-left">
                {isVideo(images[currentIndex].src) ? (
                  <video autoPlay controls className="max-h-[600px] ">
                    <source src={images[currentIndex].src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    id="modal-img"
                    src={images[currentIndex].src}
                    alt="Modal Image"
                    className={`${
                      images[currentIndex].sansur
                        ? "sansur2 lg:!h-[500px] lg:!w-[600px]"
                        : ""
                    }`}
                  />
                )}
              </div>
              <div className="modal-right flex flex-col justify-center items-center">
                <p id="modal-text" className="p-2">
                  {images[currentIndex].text}
                </p>

                <a href="/abone-ol" className="nav-btn">
                  Abone Ol
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

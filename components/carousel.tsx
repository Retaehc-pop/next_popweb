import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
  UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import react, { useRef,useCallback,useEffect } from "react";
import { Image as Images } from "@prisma/client";
import Image from "next/image"

type PropType = {
  options?: EmblaOptionsType;
  slides: Images[];
};

const Carousel = (props: PropType) => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const { options, slides } = props;
  const [viewportRef, embla] = useEmblaCarousel({loop:true}, [autoplay.current]);

  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    autoplay.current.reset();
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    autoplay.current.reset();
  }, [embla]);

  return (
    <div style={{ overflow: "hidden", width: "100%",height:"100%"}} ref={viewportRef} >
      <div style={{ display: "flex", userSelect: "none", width: "100%",height:"100%" }}>
        {slides.map((slide, index) => (
          <div style={{ position: "relative", minWidth: "100%" }} key={index}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Image src={slide.url} alt={slide.alt} layout="fill" objectFit="contain"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

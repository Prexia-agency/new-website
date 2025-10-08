'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Portfolio() {
  // Sample portfolio items - replace with actual data
  const portfolioItems = [
    {
      id: 1,
      title: "קיניגמאה מולטי אתר תדמית",
      description: "תיאור הפרויקט הראשון",
      image: "/images/P-KINIGMA.png"
    },
    {
      id: 2,
      title: "פרויקט 2",
      description: "תיאור הפרויקט השני",
      image: "/placeholder-image.jpg"
    },
    {
      id: 3,
      title: "פרויקט 3",
      description: "תיאור הפרויקט השלישי",
      image: "/placeholder-image.jpg"
    },
    {
      id: 4,
      title: "פרויקט 4",
      description: "תיאור הפרויקט הרביעי",
      image: "/placeholder-image.jpg"
    },
  ];

  return (
    <section className="w-full py-16 px-4 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-noto-hebrew text-2xl tracking-[-1.12px] font-black leading-snug lg:text-[42px] max-w-[586px] md:max-w-[470px] md:text-4xl sm:text-3xl text-black text-center mx-auto mb-30">
          העבודות האחרונות שלנו
        </h2>

        <div className="relative px-4" dir="ltr">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "ltr",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="pl-4 basis-full">
                  <div className="flex justify-center">
                    <div className="relative flex h-fit w-full max-w-2xl flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md bg-white">
                      {/* Header Section */}
                      <div className="flex flex-row justify-between tracking-tight">
                        <div className="text-sm text-gray-500">פרויקט חדש</div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="text-right">
                            <div className="flex items-center font-semibold whitespace-nowrap">
                              AK Agency
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-500">@akagency</span>
                            </div>
                          </div>
                          <img
                            src="/images/LOGO-AK.png"
                            alt="AK Agency Logo"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Project Title */}
                      <div className="leading-normal tracking-tighter break-words">
                        <h3 className="text-lg font-semibold mb-2 text-right">{item.title}</h3>
                        <p className="text-sm text-gray-600 text-right">{item.description}</p>
                      </div>

                      {/* Project Image */}
                      <div className="flex flex-1 items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-video rounded-xl border shadow-sm object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 lg:left-2" />
            <CarouselNext className="-right-4 lg:right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
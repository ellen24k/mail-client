'use client';

import {useState, useEffect} from "react";
import useEmblaCarousel from 'embla-carousel-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TabThree from "@/components/TabThree";
import TabTwo from "@/components/TabTwo";
import TabOne from "@/components/TabOne";

const TAB_VALUES = ["tab-1", "tab-2", "tab-3"];

export default function Home() {
    const [activeTab, setActiveTab] = useState("tab-1");
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps'
    });

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                const index = emblaApi.selectedScrollSnap();
                setActiveTab(TAB_VALUES[index]);
            });
        }
    }, [emblaApi]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        if (emblaApi) {
            const index = TAB_VALUES.indexOf(value);
            emblaApi.scrollTo(index);
        }
    };

    return (
        <div className="h-auto min-h-screen py-8 p-2 pb-4">
            <main className="w-[94vw] mx-auto">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4 w-[99%] mx-auto gap-4 h-12 p-1">
                        <TabsTrigger value="tab-1" className="text-base text-gray-600">SMTP@gmail,naver</TabsTrigger>
                        <TabsTrigger value="tab-2" className="text-base text-gray-600">IMAP@gmail.com</TabsTrigger>
                        <TabsTrigger value="tab-3" className="text-base text-gray-600">IMAP@naver.com</TabsTrigger>
                    </TabsList>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            <div className="flex-[0_0_100%] min-w-0 relative" style={{ height: activeTab === "tab-1" ? 'auto' : 0, overflow: 'hidden' }}>
                                <TabsContent value="tab-1" forceMount>
                                    <TabOne/>
                                </TabsContent>
                            </div>
                            <div className="flex-[0_0_100%] min-w-0 relative" style={{ height: activeTab === "tab-2" ? 'auto' : 0, overflow: 'hidden' }}>
                                <TabsContent value="tab-2" forceMount>
                                    <TabTwo/>
                                </TabsContent>
                            </div>
                            <div className="flex-[0_0_100%] min-w-0 relative" style={{ height: activeTab === "tab-3" ? 'auto' : 0, overflow: 'hidden' }}>
                                <TabsContent value="tab-3" forceMount>
                                    <TabThree/>
                                </TabsContent>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </main>
        </div>

    );
}
"use client";

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Mail = {
    from: string;
    title: string;
    date: string;
    content: string;
};
interface ImapTabProps {
    apiUrl: string;
}

const ImapTab: React.FC<ImapTabProps> = ({ apiUrl }) => {
    const [mails, setMails] = useState<Mail[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<Mail[]>([]);

    const fetchMails = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error("메일 데이터를 불러오지 못했습니다.");
            const data = await res.json();
            setMails(data);
            setFiltered(data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("메일 데이터를 불러오는 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMails();
    }, []);

    useEffect(() => {
        if (!search) {
            setFiltered(mails);
        } else {
            setFiltered(
                mails.filter(
                    (mail) =>
                        mail.title.toLowerCase().includes(search.toLowerCase()) ||
                        mail.from.toLowerCase().includes(search.toLowerCase()) ||
                        mail.content.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, mails]);

    return (
        <div className="w-[99%] mx-auto">
            <div className="w-full h-full">
                <Card className="w-full h-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>이메일 수신</CardTitle>
                        <div className="flex gap-2 items-center">
                            <Input
                                placeholder="검색 (제목, 발신자, 본문)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-56"
                            />
                            <Button onClick={fetchMails} disabled={loading}>
                                {loading ? "불러오는 중..." : "새로고침"}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filtered.length === 0 && !loading ? (
                            <div className="text-center py-8 text-muted-foreground">
                                메일이 없습니다.
                            </div>
                        ) : (
                            <Accordion type="multiple" className="w-full">
                                {filtered.map((mail, idx) => (
                                    <AccordionItem key={idx} value={`mail-${idx}`}>
                                        <AccordionTrigger>
                                            <div className="flex flex-col md:flex-row md:items-center w-full gap-1 md:gap-4 text-left">
                                                <span className="font-semibold truncate flex-1">{mail.title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <Card>
                                            <div className="whitespace-pre-line break-words px-2 py-2">
                                                <p className="font-bold">From : {mail.from}</p>
                                                <p className="text-xs text-muted-foreground min-w-[120px]">Date : {mail.date}</p>
                                                <p className="h-2"></p>
                                                {mail.content || <p className="text-muted-foreground">본문 없음</p>}
                                                {/*{mail.content ? (*/}
                                                {/*    <div*/}
                                                {/*        className="prose max-w-none"*/}
                                                {/*        dangerouslySetInnerHTML={{ __html: mail.content }}*/}
                                                {/*    />*/}
                                                {/*) : (*/}
                                                {/*    <span className="text-muted-foreground">본문 없음</span>*/}
                                                {/*)}*/}
                                            </div>
                                            </Card>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ImapTab;

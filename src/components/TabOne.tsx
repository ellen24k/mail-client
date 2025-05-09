"use client";

import React, {useState} from 'react';
import axios from 'axios';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";

const EMAILS = [
    {label: "NAVER", value: "naver"},
    {label: "GMAIL", value: "gmail"},
];

const TabOne: React.FC = () => {
    const [selectedSender, setSelectedSender] = useState<string>(EMAILS[0].value);
    const [to_email, setToEmail] = useState<string>(EMAILS[1].value);
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const sendSmtp = async () => {
        try {
            setLoading(true);
            if (!selectedSender || !to_email || !subject || !content) {
                toast("[ 알림 ]", {
                    description: "제목과 내용을 모두 입력해야 합니다.",
                });
                // toast.error("내용을 모두 입력해주세요.");
                return;
            }
            const encode_sender = encodeURIComponent(selectedSender.trim());
            const encode_to_email = encodeURIComponent(to_email.trim());
            const encode_title = encodeURIComponent(subject.trim());
            const encode_content = encodeURIComponent(content.trim());
            const response = await axios.get<string[]>(
                `http://localhost:8000/smtp/${encode_sender}/${encode_to_email}/${encode_title}/${encode_content}`
            );
            toast.success(`이메일이 전송되었습니다.`);
        } catch (err) {
            toast.error("이메일 전송에 실패했습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[99%] mx-auto">
            <div className="w-full h-full">
                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>이메일 송신</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label className="block text-xs mb-1">보낼 이메일 선택</label>
                                <select
                                    className="w-full border rounded px-2 py-1"
                                    value={selectedSender}
                                    onChange={(e) => setSelectedSender(e.target.value)}
                                >
                                    {EMAILS.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs mb-1">받을 이메일 선택</label>
                                <select
                                    className="w-full border rounded px-2 py-1"
                                    value={to_email}
                                    onChange={(e) => setToEmail(e.target.value)}
                                >
                                    {EMAILS.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs mb-1">제목</label>
                                <Input
                                    type="text"
                                    placeholder="제목을 입력하세요"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground"
                                />
                            </div>
                            <div>
                                <label className="block text-xs mb-1">내용</label>
                                <textarea
                                    placeholder="내용을 입력하세요"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={6}
                                    className="w-full rounded-md border bg-transparent px-3 py-2 text-sm resize-y focus:outline-3 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground"
                                />
                            </div>
                            <Button
                                variant="default"
                                // className="w-full h-12 text-base font-semibold rounded-lg shadow-md transition-all bg-gradient-to-r from-primary to-blue-500 hover:from-blue-600 hover:to-primary/90"
                                className="w-full h-12 text-base font-semibold rounded-lg shadow-md transition-all bg-gradient-to-r from-primary to-gray-500 hover:from-gray-600 hover:to-primary/90"
                                onClick={sendSmtp}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    전송 중...
                                </span>
                                ) : (
                                    <span>이메일 보내기</span>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TabOne;

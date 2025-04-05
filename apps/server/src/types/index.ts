
export interface SendMailParams {
    email: string;
    subject: string;
    template: string;
    context?: Record<string, unknown>;
    cc?: string;
    otp?: string;
    app_name?: string;
    support_mail?: string;
    image_path?: string;
    mail_footer?: string;
}

export interface MailInfo {
    from: string;
    to: string;
    subject: string;
    template: string;
    context: { params: SendMailParams };
    cc?: string;
}

export interface RedisData {
    date: string;
    mailCount: number;
    startTime: string;
    details: Array<{
        from: string;
        to: string;
        subject: string;
        sendingTime: string;
    }>;
}

export interface ResponseData {
    status: boolean;
    message: string;
}

export declare const FeedbackStatus: {
    readonly RECEIVED: "RECEIVED";
    readonly ANALYZING: "ANALYZING";
    readonly DONE: "DONE";
    readonly FAILED: "FAILED";
};
export type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus];

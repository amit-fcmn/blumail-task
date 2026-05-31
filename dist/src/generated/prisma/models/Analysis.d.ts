import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AnalysisModel = runtime.Types.Result.DefaultSelection<Prisma.$AnalysisPayload>;
export type AggregateAnalysis = {
    _count: AnalysisCountAggregateOutputType | null;
    _avg: AnalysisAvgAggregateOutputType | null;
    _sum: AnalysisSumAggregateOutputType | null;
    _min: AnalysisMinAggregateOutputType | null;
    _max: AnalysisMaxAggregateOutputType | null;
};
export type AnalysisAvgAggregateOutputType = {
    attemptNumber: number | null;
};
export type AnalysisSumAggregateOutputType = {
    attemptNumber: number | null;
};
export type AnalysisMinAggregateOutputType = {
    id: string | null;
    feedbackId: string | null;
    attemptNumber: number | null;
    rawAiResponse: string | null;
    errorMessage: string | null;
    modelUsed: string | null;
    createdAt: Date | null;
};
export type AnalysisMaxAggregateOutputType = {
    id: string | null;
    feedbackId: string | null;
    attemptNumber: number | null;
    rawAiResponse: string | null;
    errorMessage: string | null;
    modelUsed: string | null;
    createdAt: Date | null;
};
export type AnalysisCountAggregateOutputType = {
    id: number;
    feedbackId: number;
    attemptNumber: number;
    rawAiResponse: number;
    structuredResult: number;
    errorMessage: number;
    modelUsed: number;
    createdAt: number;
    _all: number;
};
export type AnalysisAvgAggregateInputType = {
    attemptNumber?: true;
};
export type AnalysisSumAggregateInputType = {
    attemptNumber?: true;
};
export type AnalysisMinAggregateInputType = {
    id?: true;
    feedbackId?: true;
    attemptNumber?: true;
    rawAiResponse?: true;
    errorMessage?: true;
    modelUsed?: true;
    createdAt?: true;
};
export type AnalysisMaxAggregateInputType = {
    id?: true;
    feedbackId?: true;
    attemptNumber?: true;
    rawAiResponse?: true;
    errorMessage?: true;
    modelUsed?: true;
    createdAt?: true;
};
export type AnalysisCountAggregateInputType = {
    id?: true;
    feedbackId?: true;
    attemptNumber?: true;
    rawAiResponse?: true;
    structuredResult?: true;
    errorMessage?: true;
    modelUsed?: true;
    createdAt?: true;
    _all?: true;
};
export type AnalysisAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisWhereInput;
    orderBy?: Prisma.AnalysisOrderByWithRelationInput | Prisma.AnalysisOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AnalysisCountAggregateInputType;
    _avg?: AnalysisAvgAggregateInputType;
    _sum?: AnalysisSumAggregateInputType;
    _min?: AnalysisMinAggregateInputType;
    _max?: AnalysisMaxAggregateInputType;
};
export type GetAnalysisAggregateType<T extends AnalysisAggregateArgs> = {
    [P in keyof T & keyof AggregateAnalysis]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAnalysis[P]> : Prisma.GetScalarType<T[P], AggregateAnalysis[P]>;
};
export type AnalysisGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisWhereInput;
    orderBy?: Prisma.AnalysisOrderByWithAggregationInput | Prisma.AnalysisOrderByWithAggregationInput[];
    by: Prisma.AnalysisScalarFieldEnum[] | Prisma.AnalysisScalarFieldEnum;
    having?: Prisma.AnalysisScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AnalysisCountAggregateInputType | true;
    _avg?: AnalysisAvgAggregateInputType;
    _sum?: AnalysisSumAggregateInputType;
    _min?: AnalysisMinAggregateInputType;
    _max?: AnalysisMaxAggregateInputType;
};
export type AnalysisGroupByOutputType = {
    id: string;
    feedbackId: string;
    attemptNumber: number;
    rawAiResponse: string | null;
    structuredResult: runtime.JsonValue | null;
    errorMessage: string | null;
    modelUsed: string;
    createdAt: Date;
    _count: AnalysisCountAggregateOutputType | null;
    _avg: AnalysisAvgAggregateOutputType | null;
    _sum: AnalysisSumAggregateOutputType | null;
    _min: AnalysisMinAggregateOutputType | null;
    _max: AnalysisMaxAggregateOutputType | null;
};
export type GetAnalysisGroupByPayload<T extends AnalysisGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AnalysisGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AnalysisGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AnalysisGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AnalysisGroupByOutputType[P]>;
}>>;
export type AnalysisWhereInput = {
    AND?: Prisma.AnalysisWhereInput | Prisma.AnalysisWhereInput[];
    OR?: Prisma.AnalysisWhereInput[];
    NOT?: Prisma.AnalysisWhereInput | Prisma.AnalysisWhereInput[];
    id?: Prisma.StringFilter<"Analysis"> | string;
    feedbackId?: Prisma.StringFilter<"Analysis"> | string;
    attemptNumber?: Prisma.IntFilter<"Analysis"> | number;
    rawAiResponse?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    structuredResult?: Prisma.JsonNullableFilter<"Analysis">;
    errorMessage?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    modelUsed?: Prisma.StringFilter<"Analysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"Analysis"> | Date | string;
    feedback?: Prisma.XOR<Prisma.FeedbackScalarRelationFilter, Prisma.FeedbackWhereInput>;
    latestForFeedback?: Prisma.XOR<Prisma.FeedbackNullableScalarRelationFilter, Prisma.FeedbackWhereInput> | null;
};
export type AnalysisOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    feedbackId?: Prisma.SortOrder;
    attemptNumber?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    structuredResult?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    modelUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    feedback?: Prisma.FeedbackOrderByWithRelationInput;
    latestForFeedback?: Prisma.FeedbackOrderByWithRelationInput;
};
export type AnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AnalysisWhereInput | Prisma.AnalysisWhereInput[];
    OR?: Prisma.AnalysisWhereInput[];
    NOT?: Prisma.AnalysisWhereInput | Prisma.AnalysisWhereInput[];
    feedbackId?: Prisma.StringFilter<"Analysis"> | string;
    attemptNumber?: Prisma.IntFilter<"Analysis"> | number;
    rawAiResponse?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    structuredResult?: Prisma.JsonNullableFilter<"Analysis">;
    errorMessage?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    modelUsed?: Prisma.StringFilter<"Analysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"Analysis"> | Date | string;
    feedback?: Prisma.XOR<Prisma.FeedbackScalarRelationFilter, Prisma.FeedbackWhereInput>;
    latestForFeedback?: Prisma.XOR<Prisma.FeedbackNullableScalarRelationFilter, Prisma.FeedbackWhereInput> | null;
}, "id">;
export type AnalysisOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    feedbackId?: Prisma.SortOrder;
    attemptNumber?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    structuredResult?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    modelUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AnalysisCountOrderByAggregateInput;
    _avg?: Prisma.AnalysisAvgOrderByAggregateInput;
    _max?: Prisma.AnalysisMaxOrderByAggregateInput;
    _min?: Prisma.AnalysisMinOrderByAggregateInput;
    _sum?: Prisma.AnalysisSumOrderByAggregateInput;
};
export type AnalysisScalarWhereWithAggregatesInput = {
    AND?: Prisma.AnalysisScalarWhereWithAggregatesInput | Prisma.AnalysisScalarWhereWithAggregatesInput[];
    OR?: Prisma.AnalysisScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AnalysisScalarWhereWithAggregatesInput | Prisma.AnalysisScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Analysis"> | string;
    feedbackId?: Prisma.StringWithAggregatesFilter<"Analysis"> | string;
    attemptNumber?: Prisma.IntWithAggregatesFilter<"Analysis"> | number;
    rawAiResponse?: Prisma.StringNullableWithAggregatesFilter<"Analysis"> | string | null;
    structuredResult?: Prisma.JsonNullableWithAggregatesFilter<"Analysis">;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"Analysis"> | string | null;
    modelUsed?: Prisma.StringWithAggregatesFilter<"Analysis"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Analysis"> | Date | string;
};
export type AnalysisCreateInput = {
    id?: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
    feedback: Prisma.FeedbackCreateNestedOneWithoutAnalysesInput;
    latestForFeedback?: Prisma.FeedbackCreateNestedOneWithoutLatestAnalysisInput;
};
export type AnalysisUncheckedCreateInput = {
    id?: string;
    feedbackId: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
    latestForFeedback?: Prisma.FeedbackUncheckedCreateNestedOneWithoutLatestAnalysisInput;
};
export type AnalysisUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedback?: Prisma.FeedbackUpdateOneRequiredWithoutAnalysesNestedInput;
    latestForFeedback?: Prisma.FeedbackUpdateOneWithoutLatestAnalysisNestedInput;
};
export type AnalysisUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    feedbackId?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    latestForFeedback?: Prisma.FeedbackUncheckedUpdateOneWithoutLatestAnalysisNestedInput;
};
export type AnalysisCreateManyInput = {
    id?: string;
    feedbackId: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
};
export type AnalysisUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    feedbackId?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisListRelationFilter = {
    every?: Prisma.AnalysisWhereInput;
    some?: Prisma.AnalysisWhereInput;
    none?: Prisma.AnalysisWhereInput;
};
export type AnalysisNullableScalarRelationFilter = {
    is?: Prisma.AnalysisWhereInput | null;
    isNot?: Prisma.AnalysisWhereInput | null;
};
export type AnalysisOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AnalysisCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    feedbackId?: Prisma.SortOrder;
    attemptNumber?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrder;
    structuredResult?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    modelUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisAvgOrderByAggregateInput = {
    attemptNumber?: Prisma.SortOrder;
};
export type AnalysisMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    feedbackId?: Prisma.SortOrder;
    attemptNumber?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    modelUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    feedbackId?: Prisma.SortOrder;
    attemptNumber?: Prisma.SortOrder;
    rawAiResponse?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    modelUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AnalysisSumOrderByAggregateInput = {
    attemptNumber?: Prisma.SortOrder;
};
export type AnalysisCreateNestedManyWithoutFeedbackInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput> | Prisma.AnalysisCreateWithoutFeedbackInput[] | Prisma.AnalysisUncheckedCreateWithoutFeedbackInput[];
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutFeedbackInput | Prisma.AnalysisCreateOrConnectWithoutFeedbackInput[];
    createMany?: Prisma.AnalysisCreateManyFeedbackInputEnvelope;
    connect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
};
export type AnalysisCreateNestedOneWithoutLatestForFeedbackInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutLatestForFeedbackInput>;
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutLatestForFeedbackInput;
    connect?: Prisma.AnalysisWhereUniqueInput;
};
export type AnalysisUncheckedCreateNestedManyWithoutFeedbackInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput> | Prisma.AnalysisCreateWithoutFeedbackInput[] | Prisma.AnalysisUncheckedCreateWithoutFeedbackInput[];
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutFeedbackInput | Prisma.AnalysisCreateOrConnectWithoutFeedbackInput[];
    createMany?: Prisma.AnalysisCreateManyFeedbackInputEnvelope;
    connect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
};
export type AnalysisUpdateManyWithoutFeedbackNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput> | Prisma.AnalysisCreateWithoutFeedbackInput[] | Prisma.AnalysisUncheckedCreateWithoutFeedbackInput[];
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutFeedbackInput | Prisma.AnalysisCreateOrConnectWithoutFeedbackInput[];
    upsert?: Prisma.AnalysisUpsertWithWhereUniqueWithoutFeedbackInput | Prisma.AnalysisUpsertWithWhereUniqueWithoutFeedbackInput[];
    createMany?: Prisma.AnalysisCreateManyFeedbackInputEnvelope;
    set?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    disconnect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    delete?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    connect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    update?: Prisma.AnalysisUpdateWithWhereUniqueWithoutFeedbackInput | Prisma.AnalysisUpdateWithWhereUniqueWithoutFeedbackInput[];
    updateMany?: Prisma.AnalysisUpdateManyWithWhereWithoutFeedbackInput | Prisma.AnalysisUpdateManyWithWhereWithoutFeedbackInput[];
    deleteMany?: Prisma.AnalysisScalarWhereInput | Prisma.AnalysisScalarWhereInput[];
};
export type AnalysisUpdateOneWithoutLatestForFeedbackNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutLatestForFeedbackInput>;
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutLatestForFeedbackInput;
    upsert?: Prisma.AnalysisUpsertWithoutLatestForFeedbackInput;
    disconnect?: Prisma.AnalysisWhereInput | boolean;
    delete?: Prisma.AnalysisWhereInput | boolean;
    connect?: Prisma.AnalysisWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AnalysisUpdateToOneWithWhereWithoutLatestForFeedbackInput, Prisma.AnalysisUpdateWithoutLatestForFeedbackInput>, Prisma.AnalysisUncheckedUpdateWithoutLatestForFeedbackInput>;
};
export type AnalysisUncheckedUpdateManyWithoutFeedbackNestedInput = {
    create?: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput> | Prisma.AnalysisCreateWithoutFeedbackInput[] | Prisma.AnalysisUncheckedCreateWithoutFeedbackInput[];
    connectOrCreate?: Prisma.AnalysisCreateOrConnectWithoutFeedbackInput | Prisma.AnalysisCreateOrConnectWithoutFeedbackInput[];
    upsert?: Prisma.AnalysisUpsertWithWhereUniqueWithoutFeedbackInput | Prisma.AnalysisUpsertWithWhereUniqueWithoutFeedbackInput[];
    createMany?: Prisma.AnalysisCreateManyFeedbackInputEnvelope;
    set?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    disconnect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    delete?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    connect?: Prisma.AnalysisWhereUniqueInput | Prisma.AnalysisWhereUniqueInput[];
    update?: Prisma.AnalysisUpdateWithWhereUniqueWithoutFeedbackInput | Prisma.AnalysisUpdateWithWhereUniqueWithoutFeedbackInput[];
    updateMany?: Prisma.AnalysisUpdateManyWithWhereWithoutFeedbackInput | Prisma.AnalysisUpdateManyWithWhereWithoutFeedbackInput[];
    deleteMany?: Prisma.AnalysisScalarWhereInput | Prisma.AnalysisScalarWhereInput[];
};
export type AnalysisCreateWithoutFeedbackInput = {
    id?: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
    latestForFeedback?: Prisma.FeedbackCreateNestedOneWithoutLatestAnalysisInput;
};
export type AnalysisUncheckedCreateWithoutFeedbackInput = {
    id?: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
    latestForFeedback?: Prisma.FeedbackUncheckedCreateNestedOneWithoutLatestAnalysisInput;
};
export type AnalysisCreateOrConnectWithoutFeedbackInput = {
    where: Prisma.AnalysisWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput>;
};
export type AnalysisCreateManyFeedbackInputEnvelope = {
    data: Prisma.AnalysisCreateManyFeedbackInput | Prisma.AnalysisCreateManyFeedbackInput[];
    skipDuplicates?: boolean;
};
export type AnalysisCreateWithoutLatestForFeedbackInput = {
    id?: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
    feedback: Prisma.FeedbackCreateNestedOneWithoutAnalysesInput;
};
export type AnalysisUncheckedCreateWithoutLatestForFeedbackInput = {
    id?: string;
    feedbackId: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
};
export type AnalysisCreateOrConnectWithoutLatestForFeedbackInput = {
    where: Prisma.AnalysisWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisCreateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutLatestForFeedbackInput>;
};
export type AnalysisUpsertWithWhereUniqueWithoutFeedbackInput = {
    where: Prisma.AnalysisWhereUniqueInput;
    update: Prisma.XOR<Prisma.AnalysisUpdateWithoutFeedbackInput, Prisma.AnalysisUncheckedUpdateWithoutFeedbackInput>;
    create: Prisma.XOR<Prisma.AnalysisCreateWithoutFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutFeedbackInput>;
};
export type AnalysisUpdateWithWhereUniqueWithoutFeedbackInput = {
    where: Prisma.AnalysisWhereUniqueInput;
    data: Prisma.XOR<Prisma.AnalysisUpdateWithoutFeedbackInput, Prisma.AnalysisUncheckedUpdateWithoutFeedbackInput>;
};
export type AnalysisUpdateManyWithWhereWithoutFeedbackInput = {
    where: Prisma.AnalysisScalarWhereInput;
    data: Prisma.XOR<Prisma.AnalysisUpdateManyMutationInput, Prisma.AnalysisUncheckedUpdateManyWithoutFeedbackInput>;
};
export type AnalysisScalarWhereInput = {
    AND?: Prisma.AnalysisScalarWhereInput | Prisma.AnalysisScalarWhereInput[];
    OR?: Prisma.AnalysisScalarWhereInput[];
    NOT?: Prisma.AnalysisScalarWhereInput | Prisma.AnalysisScalarWhereInput[];
    id?: Prisma.StringFilter<"Analysis"> | string;
    feedbackId?: Prisma.StringFilter<"Analysis"> | string;
    attemptNumber?: Prisma.IntFilter<"Analysis"> | number;
    rawAiResponse?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    structuredResult?: Prisma.JsonNullableFilter<"Analysis">;
    errorMessage?: Prisma.StringNullableFilter<"Analysis"> | string | null;
    modelUsed?: Prisma.StringFilter<"Analysis"> | string;
    createdAt?: Prisma.DateTimeFilter<"Analysis"> | Date | string;
};
export type AnalysisUpsertWithoutLatestForFeedbackInput = {
    update: Prisma.XOR<Prisma.AnalysisUpdateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedUpdateWithoutLatestForFeedbackInput>;
    create: Prisma.XOR<Prisma.AnalysisCreateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedCreateWithoutLatestForFeedbackInput>;
    where?: Prisma.AnalysisWhereInput;
};
export type AnalysisUpdateToOneWithWhereWithoutLatestForFeedbackInput = {
    where?: Prisma.AnalysisWhereInput;
    data: Prisma.XOR<Prisma.AnalysisUpdateWithoutLatestForFeedbackInput, Prisma.AnalysisUncheckedUpdateWithoutLatestForFeedbackInput>;
};
export type AnalysisUpdateWithoutLatestForFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedback?: Prisma.FeedbackUpdateOneRequiredWithoutAnalysesNestedInput;
};
export type AnalysisUncheckedUpdateWithoutLatestForFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    feedbackId?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisCreateManyFeedbackInput = {
    id?: string;
    attemptNumber: number;
    rawAiResponse?: string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: string | null;
    modelUsed: string;
    createdAt?: Date | string;
};
export type AnalysisUpdateWithoutFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    latestForFeedback?: Prisma.FeedbackUpdateOneWithoutLatestAnalysisNestedInput;
};
export type AnalysisUncheckedUpdateWithoutFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    latestForFeedback?: Prisma.FeedbackUncheckedUpdateOneWithoutLatestAnalysisNestedInput;
};
export type AnalysisUncheckedUpdateManyWithoutFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    attemptNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    rawAiResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    structuredResult?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    modelUsed?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AnalysisSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    feedbackId?: boolean;
    attemptNumber?: boolean;
    rawAiResponse?: boolean;
    structuredResult?: boolean;
    errorMessage?: boolean;
    modelUsed?: boolean;
    createdAt?: boolean;
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
    latestForFeedback?: boolean | Prisma.Analysis$latestForFeedbackArgs<ExtArgs>;
}, ExtArgs["result"]["analysis"]>;
export type AnalysisSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    feedbackId?: boolean;
    attemptNumber?: boolean;
    rawAiResponse?: boolean;
    structuredResult?: boolean;
    errorMessage?: boolean;
    modelUsed?: boolean;
    createdAt?: boolean;
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysis"]>;
export type AnalysisSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    feedbackId?: boolean;
    attemptNumber?: boolean;
    rawAiResponse?: boolean;
    structuredResult?: boolean;
    errorMessage?: boolean;
    modelUsed?: boolean;
    createdAt?: boolean;
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["analysis"]>;
export type AnalysisSelectScalar = {
    id?: boolean;
    feedbackId?: boolean;
    attemptNumber?: boolean;
    rawAiResponse?: boolean;
    structuredResult?: boolean;
    errorMessage?: boolean;
    modelUsed?: boolean;
    createdAt?: boolean;
};
export type AnalysisOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "feedbackId" | "attemptNumber" | "rawAiResponse" | "structuredResult" | "errorMessage" | "modelUsed" | "createdAt", ExtArgs["result"]["analysis"]>;
export type AnalysisInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
    latestForFeedback?: boolean | Prisma.Analysis$latestForFeedbackArgs<ExtArgs>;
};
export type AnalysisIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
};
export type AnalysisIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    feedback?: boolean | Prisma.FeedbackDefaultArgs<ExtArgs>;
};
export type $AnalysisPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Analysis";
    objects: {
        feedback: Prisma.$FeedbackPayload<ExtArgs>;
        latestForFeedback: Prisma.$FeedbackPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        feedbackId: string;
        attemptNumber: number;
        rawAiResponse: string | null;
        structuredResult: runtime.JsonValue | null;
        errorMessage: string | null;
        modelUsed: string;
        createdAt: Date;
    }, ExtArgs["result"]["analysis"]>;
    composites: {};
};
export type AnalysisGetPayload<S extends boolean | null | undefined | AnalysisDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AnalysisPayload, S>;
export type AnalysisCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AnalysisCountAggregateInputType | true;
};
export interface AnalysisDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Analysis'];
        meta: {
            name: 'Analysis';
        };
    };
    findUnique<T extends AnalysisFindUniqueArgs>(args: Prisma.SelectSubset<T, AnalysisFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AnalysisFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AnalysisFindFirstArgs>(args?: Prisma.SelectSubset<T, AnalysisFindFirstArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AnalysisFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AnalysisFindManyArgs>(args?: Prisma.SelectSubset<T, AnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AnalysisCreateArgs>(args: Prisma.SelectSubset<T, AnalysisCreateArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AnalysisCreateManyArgs>(args?: Prisma.SelectSubset<T, AnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AnalysisCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AnalysisDeleteArgs>(args: Prisma.SelectSubset<T, AnalysisDeleteArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AnalysisUpdateArgs>(args: Prisma.SelectSubset<T, AnalysisUpdateArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AnalysisDeleteManyArgs>(args?: Prisma.SelectSubset<T, AnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AnalysisUpdateManyArgs>(args: Prisma.SelectSubset<T, AnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AnalysisUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AnalysisUpsertArgs>(args: Prisma.SelectSubset<T, AnalysisUpsertArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AnalysisCountArgs>(args?: Prisma.Subset<T, AnalysisCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AnalysisCountAggregateOutputType> : number>;
    aggregate<T extends AnalysisAggregateArgs>(args: Prisma.Subset<T, AnalysisAggregateArgs>): Prisma.PrismaPromise<GetAnalysisAggregateType<T>>;
    groupBy<T extends AnalysisGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AnalysisGroupByArgs['orderBy'];
    } : {
        orderBy?: AnalysisGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AnalysisFieldRefs;
}
export interface Prisma__AnalysisClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    feedback<T extends Prisma.FeedbackDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeedbackDefaultArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    latestForFeedback<T extends Prisma.Analysis$latestForFeedbackArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Analysis$latestForFeedbackArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AnalysisFieldRefs {
    readonly id: Prisma.FieldRef<"Analysis", 'String'>;
    readonly feedbackId: Prisma.FieldRef<"Analysis", 'String'>;
    readonly attemptNumber: Prisma.FieldRef<"Analysis", 'Int'>;
    readonly rawAiResponse: Prisma.FieldRef<"Analysis", 'String'>;
    readonly structuredResult: Prisma.FieldRef<"Analysis", 'Json'>;
    readonly errorMessage: Prisma.FieldRef<"Analysis", 'String'>;
    readonly modelUsed: Prisma.FieldRef<"Analysis", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Analysis", 'DateTime'>;
}
export type AnalysisFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where: Prisma.AnalysisWhereUniqueInput;
};
export type AnalysisFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where: Prisma.AnalysisWhereUniqueInput;
};
export type AnalysisFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where?: Prisma.AnalysisWhereInput;
    orderBy?: Prisma.AnalysisOrderByWithRelationInput | Prisma.AnalysisOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisScalarFieldEnum | Prisma.AnalysisScalarFieldEnum[];
};
export type AnalysisFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where?: Prisma.AnalysisWhereInput;
    orderBy?: Prisma.AnalysisOrderByWithRelationInput | Prisma.AnalysisOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisScalarFieldEnum | Prisma.AnalysisScalarFieldEnum[];
};
export type AnalysisFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where?: Prisma.AnalysisWhereInput;
    orderBy?: Prisma.AnalysisOrderByWithRelationInput | Prisma.AnalysisOrderByWithRelationInput[];
    cursor?: Prisma.AnalysisWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnalysisScalarFieldEnum | Prisma.AnalysisScalarFieldEnum[];
};
export type AnalysisCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisCreateInput, Prisma.AnalysisUncheckedCreateInput>;
};
export type AnalysisCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AnalysisCreateManyInput | Prisma.AnalysisCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AnalysisCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    data: Prisma.AnalysisCreateManyInput | Prisma.AnalysisCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AnalysisIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AnalysisUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisUpdateInput, Prisma.AnalysisUncheckedUpdateInput>;
    where: Prisma.AnalysisWhereUniqueInput;
};
export type AnalysisUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AnalysisUpdateManyMutationInput, Prisma.AnalysisUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisWhereInput;
    limit?: number;
};
export type AnalysisUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AnalysisUpdateManyMutationInput, Prisma.AnalysisUncheckedUpdateManyInput>;
    where?: Prisma.AnalysisWhereInput;
    limit?: number;
    include?: Prisma.AnalysisIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AnalysisUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where: Prisma.AnalysisWhereUniqueInput;
    create: Prisma.XOR<Prisma.AnalysisCreateInput, Prisma.AnalysisUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AnalysisUpdateInput, Prisma.AnalysisUncheckedUpdateInput>;
};
export type AnalysisDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where: Prisma.AnalysisWhereUniqueInput;
};
export type AnalysisDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisWhereInput;
    limit?: number;
};
export type Analysis$latestForFeedbackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where?: Prisma.FeedbackWhereInput;
};
export type AnalysisDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
};

import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FeedbackModel = runtime.Types.Result.DefaultSelection<Prisma.$FeedbackPayload>;
export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null;
    _avg: FeedbackAvgAggregateOutputType | null;
    _sum: FeedbackSumAggregateOutputType | null;
    _min: FeedbackMinAggregateOutputType | null;
    _max: FeedbackMaxAggregateOutputType | null;
};
export type FeedbackAvgAggregateOutputType = {
    attemptCount: number | null;
};
export type FeedbackSumAggregateOutputType = {
    attemptCount: number | null;
};
export type FeedbackMinAggregateOutputType = {
    id: string | null;
    content: string | null;
    contentHash: string | null;
    status: $Enums.FeedbackStatus | null;
    attemptCount: number | null;
    latestAnalysisId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FeedbackMaxAggregateOutputType = {
    id: string | null;
    content: string | null;
    contentHash: string | null;
    status: $Enums.FeedbackStatus | null;
    attemptCount: number | null;
    latestAnalysisId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FeedbackCountAggregateOutputType = {
    id: number;
    content: number;
    contentHash: number;
    status: number;
    attemptCount: number;
    latestAnalysisId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FeedbackAvgAggregateInputType = {
    attemptCount?: true;
};
export type FeedbackSumAggregateInputType = {
    attemptCount?: true;
};
export type FeedbackMinAggregateInputType = {
    id?: true;
    content?: true;
    contentHash?: true;
    status?: true;
    attemptCount?: true;
    latestAnalysisId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FeedbackMaxAggregateInputType = {
    id?: true;
    content?: true;
    contentHash?: true;
    status?: true;
    attemptCount?: true;
    latestAnalysisId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FeedbackCountAggregateInputType = {
    id?: true;
    content?: true;
    contentHash?: true;
    status?: true;
    attemptCount?: true;
    latestAnalysisId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FeedbackAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithRelationInput | Prisma.FeedbackOrderByWithRelationInput[];
    cursor?: Prisma.FeedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FeedbackCountAggregateInputType;
    _avg?: FeedbackAvgAggregateInputType;
    _sum?: FeedbackSumAggregateInputType;
    _min?: FeedbackMinAggregateInputType;
    _max?: FeedbackMaxAggregateInputType;
};
export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
    [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFeedback[P]> : Prisma.GetScalarType<T[P], AggregateFeedback[P]>;
};
export type FeedbackGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithAggregationInput | Prisma.FeedbackOrderByWithAggregationInput[];
    by: Prisma.FeedbackScalarFieldEnum[] | Prisma.FeedbackScalarFieldEnum;
    having?: Prisma.FeedbackScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FeedbackCountAggregateInputType | true;
    _avg?: FeedbackAvgAggregateInputType;
    _sum?: FeedbackSumAggregateInputType;
    _min?: FeedbackMinAggregateInputType;
    _max?: FeedbackMaxAggregateInputType;
};
export type FeedbackGroupByOutputType = {
    id: string;
    content: string;
    contentHash: string;
    status: $Enums.FeedbackStatus;
    attemptCount: number;
    latestAnalysisId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FeedbackCountAggregateOutputType | null;
    _avg: FeedbackAvgAggregateOutputType | null;
    _sum: FeedbackSumAggregateOutputType | null;
    _min: FeedbackMinAggregateOutputType | null;
    _max: FeedbackMaxAggregateOutputType | null;
};
export type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FeedbackGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FeedbackGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FeedbackGroupByOutputType[P]>;
}>>;
export type FeedbackWhereInput = {
    AND?: Prisma.FeedbackWhereInput | Prisma.FeedbackWhereInput[];
    OR?: Prisma.FeedbackWhereInput[];
    NOT?: Prisma.FeedbackWhereInput | Prisma.FeedbackWhereInput[];
    id?: Prisma.StringFilter<"Feedback"> | string;
    content?: Prisma.StringFilter<"Feedback"> | string;
    contentHash?: Prisma.StringFilter<"Feedback"> | string;
    status?: Prisma.EnumFeedbackStatusFilter<"Feedback"> | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFilter<"Feedback"> | number;
    latestAnalysisId?: Prisma.StringNullableFilter<"Feedback"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Feedback"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Feedback"> | Date | string;
    analyses?: Prisma.AnalysisListRelationFilter;
    latestAnalysis?: Prisma.XOR<Prisma.AnalysisNullableScalarRelationFilter, Prisma.AnalysisWhereInput> | null;
};
export type FeedbackOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    contentHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attemptCount?: Prisma.SortOrder;
    latestAnalysisId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    analyses?: Prisma.AnalysisOrderByRelationAggregateInput;
    latestAnalysis?: Prisma.AnalysisOrderByWithRelationInput;
};
export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    contentHash?: string;
    latestAnalysisId?: string;
    AND?: Prisma.FeedbackWhereInput | Prisma.FeedbackWhereInput[];
    OR?: Prisma.FeedbackWhereInput[];
    NOT?: Prisma.FeedbackWhereInput | Prisma.FeedbackWhereInput[];
    content?: Prisma.StringFilter<"Feedback"> | string;
    status?: Prisma.EnumFeedbackStatusFilter<"Feedback"> | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFilter<"Feedback"> | number;
    createdAt?: Prisma.DateTimeFilter<"Feedback"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Feedback"> | Date | string;
    analyses?: Prisma.AnalysisListRelationFilter;
    latestAnalysis?: Prisma.XOR<Prisma.AnalysisNullableScalarRelationFilter, Prisma.AnalysisWhereInput> | null;
}, "id" | "contentHash" | "latestAnalysisId">;
export type FeedbackOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    contentHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attemptCount?: Prisma.SortOrder;
    latestAnalysisId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FeedbackCountOrderByAggregateInput;
    _avg?: Prisma.FeedbackAvgOrderByAggregateInput;
    _max?: Prisma.FeedbackMaxOrderByAggregateInput;
    _min?: Prisma.FeedbackMinOrderByAggregateInput;
    _sum?: Prisma.FeedbackSumOrderByAggregateInput;
};
export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: Prisma.FeedbackScalarWhereWithAggregatesInput | Prisma.FeedbackScalarWhereWithAggregatesInput[];
    OR?: Prisma.FeedbackScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FeedbackScalarWhereWithAggregatesInput | Prisma.FeedbackScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Feedback"> | string;
    content?: Prisma.StringWithAggregatesFilter<"Feedback"> | string;
    contentHash?: Prisma.StringWithAggregatesFilter<"Feedback"> | string;
    status?: Prisma.EnumFeedbackStatusWithAggregatesFilter<"Feedback"> | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntWithAggregatesFilter<"Feedback"> | number;
    latestAnalysisId?: Prisma.StringNullableWithAggregatesFilter<"Feedback"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Feedback"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Feedback"> | Date | string;
};
export type FeedbackCreateInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    analyses?: Prisma.AnalysisCreateNestedManyWithoutFeedbackInput;
    latestAnalysis?: Prisma.AnalysisCreateNestedOneWithoutLatestForFeedbackInput;
};
export type FeedbackUncheckedCreateInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    latestAnalysisId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    analyses?: Prisma.AnalysisUncheckedCreateNestedManyWithoutFeedbackInput;
};
export type FeedbackUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analyses?: Prisma.AnalysisUpdateManyWithoutFeedbackNestedInput;
    latestAnalysis?: Prisma.AnalysisUpdateOneWithoutLatestForFeedbackNestedInput;
};
export type FeedbackUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    latestAnalysisId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analyses?: Prisma.AnalysisUncheckedUpdateManyWithoutFeedbackNestedInput;
};
export type FeedbackCreateManyInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    latestAnalysisId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FeedbackUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedbackUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    latestAnalysisId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedbackCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    contentHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attemptCount?: Prisma.SortOrder;
    latestAnalysisId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedbackAvgOrderByAggregateInput = {
    attemptCount?: Prisma.SortOrder;
};
export type FeedbackMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    contentHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attemptCount?: Prisma.SortOrder;
    latestAnalysisId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedbackMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    contentHash?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attemptCount?: Prisma.SortOrder;
    latestAnalysisId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FeedbackSumOrderByAggregateInput = {
    attemptCount?: Prisma.SortOrder;
};
export type FeedbackScalarRelationFilter = {
    is?: Prisma.FeedbackWhereInput;
    isNot?: Prisma.FeedbackWhereInput;
};
export type FeedbackNullableScalarRelationFilter = {
    is?: Prisma.FeedbackWhereInput | null;
    isNot?: Prisma.FeedbackWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumFeedbackStatusFieldUpdateOperationsInput = {
    set?: $Enums.FeedbackStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type FeedbackCreateNestedOneWithoutAnalysesInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutAnalysesInput, Prisma.FeedbackUncheckedCreateWithoutAnalysesInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutAnalysesInput;
    connect?: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackCreateNestedOneWithoutLatestAnalysisInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutLatestAnalysisInput;
    connect?: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackUncheckedCreateNestedOneWithoutLatestAnalysisInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutLatestAnalysisInput;
    connect?: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackUpdateOneRequiredWithoutAnalysesNestedInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutAnalysesInput, Prisma.FeedbackUncheckedCreateWithoutAnalysesInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutAnalysesInput;
    upsert?: Prisma.FeedbackUpsertWithoutAnalysesInput;
    connect?: Prisma.FeedbackWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedbackUpdateToOneWithWhereWithoutAnalysesInput, Prisma.FeedbackUpdateWithoutAnalysesInput>, Prisma.FeedbackUncheckedUpdateWithoutAnalysesInput>;
};
export type FeedbackUpdateOneWithoutLatestAnalysisNestedInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutLatestAnalysisInput;
    upsert?: Prisma.FeedbackUpsertWithoutLatestAnalysisInput;
    disconnect?: Prisma.FeedbackWhereInput | boolean;
    delete?: Prisma.FeedbackWhereInput | boolean;
    connect?: Prisma.FeedbackWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedbackUpdateToOneWithWhereWithoutLatestAnalysisInput, Prisma.FeedbackUpdateWithoutLatestAnalysisInput>, Prisma.FeedbackUncheckedUpdateWithoutLatestAnalysisInput>;
};
export type FeedbackUncheckedUpdateOneWithoutLatestAnalysisNestedInput = {
    create?: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
    connectOrCreate?: Prisma.FeedbackCreateOrConnectWithoutLatestAnalysisInput;
    upsert?: Prisma.FeedbackUpsertWithoutLatestAnalysisInput;
    disconnect?: Prisma.FeedbackWhereInput | boolean;
    delete?: Prisma.FeedbackWhereInput | boolean;
    connect?: Prisma.FeedbackWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedbackUpdateToOneWithWhereWithoutLatestAnalysisInput, Prisma.FeedbackUpdateWithoutLatestAnalysisInput>, Prisma.FeedbackUncheckedUpdateWithoutLatestAnalysisInput>;
};
export type FeedbackCreateWithoutAnalysesInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    latestAnalysis?: Prisma.AnalysisCreateNestedOneWithoutLatestForFeedbackInput;
};
export type FeedbackUncheckedCreateWithoutAnalysesInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    latestAnalysisId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FeedbackCreateOrConnectWithoutAnalysesInput = {
    where: Prisma.FeedbackWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedbackCreateWithoutAnalysesInput, Prisma.FeedbackUncheckedCreateWithoutAnalysesInput>;
};
export type FeedbackCreateWithoutLatestAnalysisInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    analyses?: Prisma.AnalysisCreateNestedManyWithoutFeedbackInput;
};
export type FeedbackUncheckedCreateWithoutLatestAnalysisInput = {
    id?: string;
    content: string;
    contentHash: string;
    status?: $Enums.FeedbackStatus;
    attemptCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    analyses?: Prisma.AnalysisUncheckedCreateNestedManyWithoutFeedbackInput;
};
export type FeedbackCreateOrConnectWithoutLatestAnalysisInput = {
    where: Prisma.FeedbackWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
};
export type FeedbackUpsertWithoutAnalysesInput = {
    update: Prisma.XOR<Prisma.FeedbackUpdateWithoutAnalysesInput, Prisma.FeedbackUncheckedUpdateWithoutAnalysesInput>;
    create: Prisma.XOR<Prisma.FeedbackCreateWithoutAnalysesInput, Prisma.FeedbackUncheckedCreateWithoutAnalysesInput>;
    where?: Prisma.FeedbackWhereInput;
};
export type FeedbackUpdateToOneWithWhereWithoutAnalysesInput = {
    where?: Prisma.FeedbackWhereInput;
    data: Prisma.XOR<Prisma.FeedbackUpdateWithoutAnalysesInput, Prisma.FeedbackUncheckedUpdateWithoutAnalysesInput>;
};
export type FeedbackUpdateWithoutAnalysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    latestAnalysis?: Prisma.AnalysisUpdateOneWithoutLatestForFeedbackNestedInput;
};
export type FeedbackUncheckedUpdateWithoutAnalysesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    latestAnalysisId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedbackUpsertWithoutLatestAnalysisInput = {
    update: Prisma.XOR<Prisma.FeedbackUpdateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedUpdateWithoutLatestAnalysisInput>;
    create: Prisma.XOR<Prisma.FeedbackCreateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedCreateWithoutLatestAnalysisInput>;
    where?: Prisma.FeedbackWhereInput;
};
export type FeedbackUpdateToOneWithWhereWithoutLatestAnalysisInput = {
    where?: Prisma.FeedbackWhereInput;
    data: Prisma.XOR<Prisma.FeedbackUpdateWithoutLatestAnalysisInput, Prisma.FeedbackUncheckedUpdateWithoutLatestAnalysisInput>;
};
export type FeedbackUpdateWithoutLatestAnalysisInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analyses?: Prisma.AnalysisUpdateManyWithoutFeedbackNestedInput;
};
export type FeedbackUncheckedUpdateWithoutLatestAnalysisInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    contentHash?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus;
    attemptCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    analyses?: Prisma.AnalysisUncheckedUpdateManyWithoutFeedbackNestedInput;
};
export type FeedbackCountOutputType = {
    analyses: number;
};
export type FeedbackCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analyses?: boolean | FeedbackCountOutputTypeCountAnalysesArgs;
};
export type FeedbackCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackCountOutputTypeSelect<ExtArgs> | null;
};
export type FeedbackCountOutputTypeCountAnalysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AnalysisWhereInput;
};
export type FeedbackSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    contentHash?: boolean;
    status?: boolean;
    attemptCount?: boolean;
    latestAnalysisId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    analyses?: boolean | Prisma.Feedback$analysesArgs<ExtArgs>;
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
    _count?: boolean | Prisma.FeedbackCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedback"]>;
export type FeedbackSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    contentHash?: boolean;
    status?: boolean;
    attemptCount?: boolean;
    latestAnalysisId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
}, ExtArgs["result"]["feedback"]>;
export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    contentHash?: boolean;
    status?: boolean;
    attemptCount?: boolean;
    latestAnalysisId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
}, ExtArgs["result"]["feedback"]>;
export type FeedbackSelectScalar = {
    id?: boolean;
    content?: boolean;
    contentHash?: boolean;
    status?: boolean;
    attemptCount?: boolean;
    latestAnalysisId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FeedbackOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "contentHash" | "status" | "attemptCount" | "latestAnalysisId" | "createdAt" | "updatedAt", ExtArgs["result"]["feedback"]>;
export type FeedbackInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analyses?: boolean | Prisma.Feedback$analysesArgs<ExtArgs>;
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
    _count?: boolean | Prisma.FeedbackCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
};
export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    latestAnalysis?: boolean | Prisma.Feedback$latestAnalysisArgs<ExtArgs>;
};
export type $FeedbackPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Feedback";
    objects: {
        analyses: Prisma.$AnalysisPayload<ExtArgs>[];
        latestAnalysis: Prisma.$AnalysisPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        content: string;
        contentHash: string;
        status: $Enums.FeedbackStatus;
        attemptCount: number;
        latestAnalysisId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["feedback"]>;
    composites: {};
};
export type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeedbackPayload, S>;
export type FeedbackCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeedbackCountAggregateInputType | true;
};
export interface FeedbackDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Feedback'];
        meta: {
            name: 'Feedback';
        };
    };
    findUnique<T extends FeedbackFindUniqueArgs>(args: Prisma.SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FeedbackFindFirstArgs>(args?: Prisma.SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FeedbackFindManyArgs>(args?: Prisma.SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FeedbackCreateArgs>(args: Prisma.SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FeedbackCreateManyArgs>(args?: Prisma.SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FeedbackDeleteArgs>(args: Prisma.SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FeedbackUpdateArgs>(args: Prisma.SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FeedbackUpdateManyArgs>(args: Prisma.SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FeedbackUpsertArgs>(args: Prisma.SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma.Prisma__FeedbackClient<runtime.Types.Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FeedbackCountArgs>(args?: Prisma.Subset<T, FeedbackCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FeedbackCountAggregateOutputType> : number>;
    aggregate<T extends FeedbackAggregateArgs>(args: Prisma.Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>;
    groupBy<T extends FeedbackGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FeedbackGroupByArgs['orderBy'];
    } : {
        orderBy?: FeedbackGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FeedbackFieldRefs;
}
export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    analyses<T extends Prisma.Feedback$analysesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Feedback$analysesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    latestAnalysis<T extends Prisma.Feedback$latestAnalysisArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Feedback$latestAnalysisArgs<ExtArgs>>): Prisma.Prisma__AnalysisClient<runtime.Types.Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FeedbackFieldRefs {
    readonly id: Prisma.FieldRef<"Feedback", 'String'>;
    readonly content: Prisma.FieldRef<"Feedback", 'String'>;
    readonly contentHash: Prisma.FieldRef<"Feedback", 'String'>;
    readonly status: Prisma.FieldRef<"Feedback", 'FeedbackStatus'>;
    readonly attemptCount: Prisma.FieldRef<"Feedback", 'Int'>;
    readonly latestAnalysisId: Prisma.FieldRef<"Feedback", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Feedback", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Feedback", 'DateTime'>;
}
export type FeedbackFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithRelationInput | Prisma.FeedbackOrderByWithRelationInput[];
    cursor?: Prisma.FeedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedbackScalarFieldEnum | Prisma.FeedbackScalarFieldEnum[];
};
export type FeedbackFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithRelationInput | Prisma.FeedbackOrderByWithRelationInput[];
    cursor?: Prisma.FeedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedbackScalarFieldEnum | Prisma.FeedbackScalarFieldEnum[];
};
export type FeedbackFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where?: Prisma.FeedbackWhereInput;
    orderBy?: Prisma.FeedbackOrderByWithRelationInput | Prisma.FeedbackOrderByWithRelationInput[];
    cursor?: Prisma.FeedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedbackScalarFieldEnum | Prisma.FeedbackScalarFieldEnum[];
};
export type FeedbackCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedbackCreateInput, Prisma.FeedbackUncheckedCreateInput>;
};
export type FeedbackCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeedbackCreateManyInput | Prisma.FeedbackCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FeedbackCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    data: Prisma.FeedbackCreateManyInput | Prisma.FeedbackCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FeedbackIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FeedbackUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedbackUpdateInput, Prisma.FeedbackUncheckedUpdateInput>;
    where: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeedbackUpdateManyMutationInput, Prisma.FeedbackUncheckedUpdateManyInput>;
    where?: Prisma.FeedbackWhereInput;
    limit?: number;
};
export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedbackUpdateManyMutationInput, Prisma.FeedbackUncheckedUpdateManyInput>;
    where?: Prisma.FeedbackWhereInput;
    limit?: number;
    include?: Prisma.FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FeedbackUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where: Prisma.FeedbackWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedbackCreateInput, Prisma.FeedbackUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FeedbackUpdateInput, Prisma.FeedbackUncheckedUpdateInput>;
};
export type FeedbackDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
    where: Prisma.FeedbackWhereUniqueInput;
};
export type FeedbackDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedbackWhereInput;
    limit?: number;
};
export type Feedback$analysesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Feedback$latestAnalysisArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AnalysisSelect<ExtArgs> | null;
    omit?: Prisma.AnalysisOmit<ExtArgs> | null;
    include?: Prisma.AnalysisInclude<ExtArgs> | null;
    where?: Prisma.AnalysisWhereInput;
};
export type FeedbackDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedbackSelect<ExtArgs> | null;
    omit?: Prisma.FeedbackOmit<ExtArgs> | null;
    include?: Prisma.FeedbackInclude<ExtArgs> | null;
};

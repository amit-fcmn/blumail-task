-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('RECEIVED', 'ANALYZING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "content_hash" TEXT NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'RECEIVED',
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "latest_analysis_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analysis" (
    "id" TEXT NOT NULL,
    "feedback_id" TEXT NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "raw_ai_response" TEXT,
    "structured_result" JSONB,
    "error_message" TEXT,
    "model_used" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback_content_hash_key" ON "feedback"("content_hash");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_latest_analysis_id_key" ON "feedback"("latest_analysis_id");

-- CreateIndex
CREATE INDEX "feedback_status_created_at_idx" ON "feedback"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "feedback_created_at_idx" ON "feedback"("created_at" DESC);

-- CreateIndex
CREATE INDEX "analysis_feedback_id_created_at_idx" ON "analysis"("feedback_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "analysis" ADD CONSTRAINT "analysis_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_latest_analysis_id_fkey" FOREIGN KEY ("latest_analysis_id") REFERENCES "analysis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

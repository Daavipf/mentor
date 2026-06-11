-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "context" TEXT,
    "alternativesIntroduction" TEXT,
    "area" TEXT NOT NULL,
    "discipline" TEXT,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTopics" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "QuestionTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionImages" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "QuestionImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alternatives" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "imagePath" TEXT,

    CONSTRAINT "Alternatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamAreas" (
    "id" TEXT NOT NULL,
    "examsId" TEXT NOT NULL,
    "area" TEXT NOT NULL,

    CONSTRAINT "ExamAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsOnExams" (
    "questionId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "gotRight" BOOLEAN,
    "selectedAlternativeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionsOnExams_pkey" PRIMARY KEY ("questionId","examId")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "QuestionTopics" ADD CONSTRAINT "QuestionTopics_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionImages" ADD CONSTRAINT "QuestionImages_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternatives" ADD CONSTRAINT "Alternatives_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAreas" ADD CONSTRAINT "ExamAreas_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnExams" ADD CONSTRAINT "QuestionsOnExams_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnExams" ADD CONSTRAINT "QuestionsOnExams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnExams" ADD CONSTRAINT "QuestionsOnExams_selectedAlternativeId_fkey" FOREIGN KEY ("selectedAlternativeId") REFERENCES "Alternatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

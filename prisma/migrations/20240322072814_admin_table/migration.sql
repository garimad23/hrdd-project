-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactName" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "emailid" TEXT NOT NULL,
    "contactnumber" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "organisationid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "organisationId" TEXT NOT NULL,
    "organistaionName" TEXT NOT NULL,
    "constactnumber" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("organisationId")
);

-- CreateTable
CREATE TABLE "Greivance" (
    "greivanceId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,
    "greivanceDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "greivanceType" TEXT NOT NULL,
    "authenticationStatus" TEXT NOT NULL,
    "authenticationFindings" TEXT NOT NULL,
    "authenticationDOCUMENT" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "geography" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timeline" TIMESTAMP(3) NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "pocId" TEXT NOT NULL,
    "pocfindings" TEXT NOT NULL,
    "pocImages" TEXT NOT NULL,
    "invstigationOffcerId" TEXT NOT NULL,
    "investigationFindings" TEXT NOT NULL,
    "investigationDocuments" TEXT NOT NULL,
    "actionPlan" TEXT NOT NULL,
    "actionplanAttachmenets" TEXT NOT NULL,
    "GIRreport" TEXT NOT NULL,
    "GIRAttachments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Greivance_pkey" PRIMARY KEY ("greivanceId")
);

-- CreateTable
CREATE TABLE "pocId" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "countrycode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "pocId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investigationgOFFICER" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "countrycode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "investigationgOFFICER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGreivanceRecord" (
    "greivancedId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageType" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGreivanceRecord_pkey" PRIMARY KEY ("greivancedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactnumber_key" ON "User"("contactnumber");

-- CreateIndex
CREATE UNIQUE INDEX "pocId_id_key" ON "pocId"("id");

-- CreateIndex
CREATE UNIQUE INDEX "investigationgOFFICER_id_key" ON "investigationgOFFICER"("id");

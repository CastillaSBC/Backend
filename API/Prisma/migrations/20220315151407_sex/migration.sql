-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL DEFAULT 'default',
    "description" TEXT NOT NULL DEFAULT 'Hello! I am new!',
    "feed" TEXT NOT NULL DEFAULT 'Hi there!',
    "createdAt" INTEGER NOT NULL DEFAULT 0,
    "loggedAt" INTEGER NOT NULL DEFAULT 0,
    "lastReward" INTEGER NOT NULL DEFAULT 0,
    "azuCoins" INTEGER NOT NULL DEFAULT 0,
    "permissionLevel" INTEGER NOT NULL DEFAULT 1,
    "ip" TEXT
);

-- CreateTable
CREATE TABLE "Badges" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "badgeName" TEXT NOT NULL,
    "badgeContent" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    CONSTRAINT "Badges_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL,
    "categoryDescription" TEXT NOT NULL,
    "adminRestricted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "TokenLottery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prizeOne" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "prizeOneWin" DATETIME NOT NULL,
    "prizeTwo" INTEGER NOT NULL,
    "prizeTwoWin" DATETIME NOT NULL,
    "prizeThree" INTEGER NOT NULL,
    "prizeThreeWin" DATETIME NOT NULL,
    CONSTRAINT "TokenLottery_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Threads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "adminThread" BOOLEAN NOT NULL DEFAULT false,
    "glowing" BOOLEAN NOT NULL DEFAULT false,
    "glowingSince" INTEGER,
    "createdAt" INTEGER NOT NULL,
    "repliedAt" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "creatorID" INTEGER NOT NULL,
    CONSTRAINT "Threads_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Threads_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "threadID" INTEGER NOT NULL,
    "creatorID" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    CONSTRAINT "Responses_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Responses_threadID_fkey" FOREIGN KEY ("threadID") REFERENCES "Threads" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "responseID" INTEGER NOT NULL,
    CONSTRAINT "Quotes_responseID_fkey" FOREIGN KEY ("responseID") REFERENCES "Responses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TokenLottery_userID_key" ON "TokenLottery"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Quotes_responseID_key" ON "Quotes"("responseID");

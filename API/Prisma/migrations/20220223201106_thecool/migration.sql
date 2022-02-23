-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `verifiedEmail` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'default',
    `description` VARCHAR(191) NOT NULL DEFAULT 'Hello! I am new!',
    `feed` VARCHAR(191) NOT NULL DEFAULT 'Hi there!',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `badgeName` VARCHAR(191) NOT NULL,
    `badgeContent` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `categoryDescription` VARCHAR(191) NOT NULL,
    `adminRestricted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenLottery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prizeOne` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `prizeOneWin` DATETIME(3) NOT NULL,
    `prizeTwo` INTEGER NOT NULL,
    `prizeTwoWin` DATETIME(3) NOT NULL,
    `prizeThree` INTEGER NOT NULL,
    `prizeThreeWin` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TokenLottery_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Threads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `locked` BOOLEAN NOT NULL DEFAULT false,
    `pinned` BOOLEAN NOT NULL DEFAULT false,
    `adminThread` BOOLEAN NOT NULL DEFAULT false,
    `glowing` BOOLEAN NOT NULL DEFAULT false,
    `glowingSince` INTEGER NOT NULL,
    `createdAt` DATE NULL,
    `repliedAt` INTEGER NOT NULL,
    `categoryID` INTEGER NOT NULL,
    `creatorID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `body` VARCHAR(191) NOT NULL,
    `threadID` INTEGER NOT NULL,
    `creatorID` INTEGER NOT NULL,
    `createdAt` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `responseID` INTEGER NOT NULL,

    UNIQUE INDEX `Quotes_responseID_key`(`responseID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Badges` ADD CONSTRAINT `Badges_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TokenLottery` ADD CONSTRAINT `TokenLottery_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Threads` ADD CONSTRAINT `Threads_creatorID_fkey` FOREIGN KEY (`creatorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Threads` ADD CONSTRAINT `Threads_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_creatorID_fkey` FOREIGN KEY (`creatorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_threadID_fkey` FOREIGN KEY (`threadID`) REFERENCES `Threads`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotes` ADD CONSTRAINT `Quotes_responseID_fkey` FOREIGN KEY (`responseID`) REFERENCES `Responses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
